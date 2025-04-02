import React, { useState } from "react";
import { RRule } from "rrule";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { addDoctorSlots } from "src/services/doctor/doctorapi";
import { toast } from 'sonner'

interface Slot {
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

const DoctorAddSlot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    recurring: false, // New field to track recurring slots
    frequency: "daily",
    weekdays: [] as number[],
  });

  const doctorInfo = localStorage.getItem("doctorInfo");
  const parsedDoctorInfo = JSON.parse(doctorInfo as any);
  // Handle opening/closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox toggle for recurring slots
  const handleRecurringToggle = () => {
    setFormData((prev) => ({ ...prev, recurring: !prev.recurring }));
  };

  // Handle weekday selection (for weekly recurrence)
  const handleWeekdayChange = (day: number) => {
    setFormData((prev) => ({
      ...prev,
      weekdays: prev.weekdays.includes(day)
        ? prev.weekdays.filter((d) => d !== day) // Remove if already selected
        : [...prev.weekdays, day], // Add if not selected
    }));
  };


  const generateSlots = async () => {
    const { date, startTime, endTime, recurring, frequency, weekdays } = formData;
    if (!date || !startTime || !endTime) return;

    try {
      if (!recurring) {
        // Create only a single slot if recurring is disabled
        const newSlot = { date, startTime, endTime, status: "Available" };

        setSlots((prevSlots) => [...prevSlots, newSlot]); // Ensure state updates correctly

        const docSlotData = { ...newSlot, doctorId: parsedDoctorInfo._id };

        await addDoctorSlots(docSlotData); // Add await to properly catch errors

      } else {
        // Generate recurring slots using rrule
        const startDate = new Date(`${date}T${startTime}`);
        const ruleOptions: any = {
          dtstart: startDate,
          count: 10, // Generate 10 slots
        };

        if (frequency === "daily") {
          ruleOptions.freq = RRule.DAILY;
        } else if (frequency === "weekly") {
          ruleOptions.freq = RRule.WEEKLY;
          ruleOptions.byweekday = weekdays;
        }

        const rule = new RRule(ruleOptions);
        const generatedSlots = rule.all().map((slotDate) => ({
          date: new Date(slotDate).toISOString().split("T")[0],
          startTime,
          endTime,
          status: "Available",
        }));

        setSlots((prevSlots) => [...prevSlots, ...generatedSlots]); // Correct state update

        const docRecSlotData = generatedSlots.map(slot => ({
          ...slot,
          doctorId: parsedDoctorInfo._id,
        }));

        await addDoctorSlots(docRecSlotData); // Add await to properly catch errors
      }
    } catch (error: any) {
      console.log("catch block worked", error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, 
          { 
            position: "top-center",
            duration: 25000 // Time in milliseconds (5000ms = 5 seconds)
           
        }
        );
      } else {
        toast.error(error.response?.data?.message || "Something went wrong", { position: "top-center" });
      }
    }

    handleClose();
  };


  return (
    <div>
      {/* Add Slots Button */}
      <Button variant="contained" sx={{ backgroundColor: "#14b8a6", color: "white", float: "right" }} onClick={handleOpen}>
        Add Slots
      </Button>

      {/* Modal Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Slots</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="" type="date" name="date" onChange={handleChange} sx={{ my: 1 }} />
          <TextField fullWidth label="" type="time" name="startTime" onChange={handleChange} sx={{ my: 1 }} />
          <TextField fullWidth label="" type="time" name="endTime" onChange={handleChange} sx={{ my: 1 }} />

          {/* Toggle Recurrence Option */}
          <FormControlLabel
            control={<Checkbox checked={formData.recurring} onChange={handleRecurringToggle} />}
            label="Recurring Slot"
          />

          {/* Show recurrence settings only if "Recurring" is checked */}
          {formData.recurring && (
            <>
              <TextField select fullWidth label="Recurrence" name="frequency" value={formData.frequency} onChange={handleChange} sx={{ my: 1 }}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
              </TextField>

              {/* Select weekdays if "weekly" is chosen */}
              {formData.frequency === "weekly" && (
                <div>
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                    <FormControlLabel
                      key={day}
                      control={<Checkbox checked={formData.weekdays.includes(index)} onChange={() => handleWeekdayChange(index)} />}
                      label={day}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={generateSlots} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table Displaying Slots */}
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>End Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.date}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.startTime}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.endTime}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAddSlot;
