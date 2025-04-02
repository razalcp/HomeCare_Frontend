


// import React, { useState, useEffect } from "react";
// import { RRule } from "rrule";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
// import { addDoctorSlots, fetchDoctorSlots } from "src/services/doctor/doctorapi"; // Add fetch function
// import { toast } from 'sonner'

// interface Slot {
//   date: string;
//   startTime: string;
//   endTime: string;
//   status: string;
// }

// const DoctorAddSlot: React.FC = () => {
//   const [open, setOpen] = useState(false);
//   const [slots, setSlots] = useState<Slot[]>([]); // Fetch from backend
//   const [formData, setFormData] = useState({
//     date: "",
//     startTime: "",
//     endTime: "",
//     recurring: false,
//     frequency: "daily",
//     weekdays: [] as number[],
//   });

//   const doctorInfo = localStorage.getItem("doctorInfo");
//   const parsedDoctorInfo = JSON.parse(doctorInfo as any);

//   // Fetch slots from backend when component mounts or when slots change
//   useEffect(() => {
//     const getSlots = async () => {
//       try {
//         const response: any = await fetchDoctorSlots(parsedDoctorInfo._id);
//         setSlots(response.data); // Set backend data
//       } catch (error) {
//         toast.error("Failed to fetch slots");
//       }
//     };

//     getSlots();
//   }, []); // Fetch only on mount

//   // Handle modal open/close
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRecurringToggle = () => {
//     setFormData((prev) => ({ ...prev, recurring: !prev.recurring }));
//   };

//   const handleWeekdayChange = (day: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       weekdays: prev.weekdays.includes(day)
//         ? prev.weekdays.filter((d) => d !== day)
//         : [...prev.weekdays, day],
//     }));
//   };

//   const generateSlots = async () => {
//     const { date, startTime, endTime, recurring, frequency, weekdays } = formData;
//     if (!date || !startTime || !endTime) return;

//     try {
//       let newSlots = [];

//       if (!recurring) {
//         const newSlot = { date, startTime, endTime, status: "Available", doctorId: parsedDoctorInfo._id };
//         await addDoctorSlots(newSlot);
//         newSlots = [newSlot]; // Add single slot to state
//       } else {
//         const startDate = new Date(`${date}T${startTime}`);
//         const ruleOptions: any = { dtstart: startDate, count: 10 };

//         if (frequency === "daily") ruleOptions.freq = RRule.DAILY;
//         else if (frequency === "weekly") {
//           ruleOptions.freq = RRule.WEEKLY;
//           ruleOptions.byweekday = weekdays;
//         }

//         const rule = new RRule(ruleOptions);
//         newSlots = rule.all().map((slotDate) => ({
//           date: new Date(slotDate).toISOString().split("T")[0],
//           startTime,
//           endTime,
//           status: "Available",
//           doctorId: parsedDoctorInfo._id,
//         }));

//         await addDoctorSlots(newSlots);
//       }

//       // **Update State** by appending new slots
//       setSlots((prevSlots) => [...prevSlots, ...newSlots]);

//       toast.success("Slot(s) added successfully!", { position: "top-center", duration: 5000 });
//       handleClose();
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Something went wrong", {
//         duration: 15000, // 25,000 milliseconds (25 seconds)
//         position: "top-center",
//       });
//     }
//   };


//   return (
//     <div>
//       <div style={{ marginBottom: "20px" }}>
//       <Button variant="contained" sx={{ backgroundColor: "#14b8a6", color: "white", float: "right" ,mb: 4,mr: 4}} onClick={handleOpen}>
//         Add Slots
//       </Button>
//       </div>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add Slots</DialogTitle>
//         <DialogContent>
//           <TextField fullWidth type="date" name="date" onChange={handleChange} sx={{ my: 1 }}  inputProps={{ min: new Date().toISOString().split("T")[0] }} />
//           <TextField fullWidth type="time" name="startTime" onChange={handleChange} sx={{ my: 1 }} />
//           <TextField fullWidth type="time" name="endTime" onChange={handleChange} sx={{ my: 1 }} />

//           <FormControlLabel control={<Checkbox checked={formData.recurring} onChange={handleRecurringToggle} />} label="Recurring Slot" />

//           {formData.recurring && (
//             <>
//               <TextField select fullWidth name="frequency" value={formData.frequency} onChange={handleChange} sx={{ my: 1 }}>
//                 <MenuItem value="daily">Daily</MenuItem>
//                 <MenuItem value="weekly">Weekly</MenuItem>
//               </TextField>

//               {formData.frequency === "weekly" && (
//                 <div>
//                   {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
//                     <FormControlLabel key={day} control={<Checkbox checked={formData.weekdays.includes(index)} onChange={() => handleWeekdayChange(index)} />} label={day} />
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={generateSlots} variant="contained" color="primary">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Display fetched slots */ }
//   <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
//     <thead>
//       <tr style={{ background: "#f4f4f4" }}>
//         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
//         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Time</th>
//         <th style={{ padding: "10px", border: "1px solid #ddd" }}>End Time</th>
//         <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
//       </tr>
//     </thead>
//     <tbody>
//       {slots.map((slot, index) => (
//         <tr key={index}>
//           <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.date}</td>
//           <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.startTime}</td>
//           <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.endTime}</td>
//           <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.status}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//     </div >
//   );
// };

// export default DoctorAddSlot;


import React, { useState, useEffect } from "react";
import { RRule } from "rrule";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { addDoctorSlots, fetchDoctorSlots } from "src/services/doctor/doctorapi";
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Slot {
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

const DoctorAddSlot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const doctorInfo = localStorage.getItem("doctorInfo");
  const parsedDoctorInfo = JSON.parse(doctorInfo as any);

  useEffect(() => {
    const getSlots = async () => {
      try {
        const response: any = await fetchDoctorSlots(parsedDoctorInfo._id);
        setSlots(response.data);
      } catch (error) {
        toast.error("Failed to fetch slots");
      }
    };
    getSlots();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      date: "",
      startTime: "",
      endTime: "",
      recurring: false,
      frequency: "daily",
      weekdays: [] as number[],
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Date is required"),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
    }),
    onSubmit: async (values) => {
      try {
        let newSlots = [];
        if (!values.recurring) {
          const newSlot = { date: values.date, startTime: values.startTime, endTime: values.endTime, status: "Available", doctorId: parsedDoctorInfo._id };
          await addDoctorSlots(newSlot);
          newSlots = [newSlot];
        } else {
          const startDate = new Date(`${values.date}T${values.startTime}`);
          const ruleOptions: any = { dtstart: startDate, count: 10 };

          if (values.frequency === "daily") ruleOptions.freq = RRule.DAILY;
          else if (values.frequency === "weekly") {
            ruleOptions.freq = RRule.WEEKLY;
            ruleOptions.byweekday = values.weekdays;
          }

          const rule = new RRule(ruleOptions);
          newSlots = rule.all().map((slotDate) => ({
            date: new Date(slotDate).toISOString().split("T")[0],
            startTime: values.startTime,
            endTime: values.endTime,
            status: "Available",
            doctorId: parsedDoctorInfo._id,
          }));

          await addDoctorSlots(newSlots);
        }
        setSlots((prevSlots) => [...prevSlots, ...newSlots]);
        toast.success("Slot(s) added successfully!");
        handleClose();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Button variant="contained" sx={{ backgroundColor: "#14b8a6", color: "white", float: "right", mb: 4, mr: 4 }} onClick={handleOpen}>
          Add Slots
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Slots</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth type="date" name="date" onChange={formik.handleChange} value={formik.values.date} sx={{ my: 1 }} inputProps={{ min: new Date().toISOString().split("T")[0] }} error={!!formik.errors.date} helperText={formik.errors.date} />
            <TextField fullWidth type="time" name="startTime" onChange={formik.handleChange} value={formik.values.startTime} sx={{ my: 1 }} error={!!formik.errors.startTime} helperText={formik.errors.startTime} />
            <TextField fullWidth type="time" name="endTime" onChange={formik.handleChange} value={formik.values.endTime} sx={{ my: 1 }} error={!!formik.errors.endTime} helperText={formik.errors.endTime} />

            <FormControlLabel control={<Checkbox checked={formik.values.recurring} onChange={() => formik.setFieldValue("recurring", !formik.values.recurring)} />} label="Recurring Slot" />

            {formik.values.recurring && (
              <>
                <TextField select fullWidth name="frequency" value={formik.values.frequency} onChange={formik.handleChange} sx={{ my: 1 }}>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </TextField>

                {formik.values.frequency === "weekly" && (
                  <div>
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                      <FormControlLabel key={day} control={<Checkbox checked={formik.values.weekdays.includes(index)} onChange={() => formik.setFieldValue("weekdays", formik.values.weekdays.includes(index) ? formik.values.weekdays.filter((d) => d !== index) : [...formik.values.weekdays, index])} />} label={day} />
                    ))}
                  </div>
                )}
              </>
            )}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
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

