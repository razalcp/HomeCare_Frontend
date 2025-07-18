
import React, { useState, useEffect } from "react";
import { RRule } from "rrule";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  addDoctorSlots,
  deleteSlot,
  fetchDoctorSlots,
} from "src/services/doctor/doctorapi";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import Notiflix from "notiflix";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

const DoctorAddSlot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSlots, setTotalSlots] = useState(0);
  const [refreshSlots, setRefreshSlots] = useState(false);

  const slotsPerPage = 8;

  const doctorInfo = localStorage.getItem("doctorInfo");
  const parsedDoctorInfo = JSON.parse(doctorInfo as any);

  useEffect(() => {
    const getSlots = async () => {
      try {
        const response: any = await fetchDoctorSlots(parsedDoctorInfo._id, currentPage, slotsPerPage);
        setSlots(response.data.slots);
        setTotalSlots(response.data.total);
      } catch (error) {
        toast.error("Failed to fetch slots");
      }
    };
    getSlots();
  }, [currentPage, refreshSlots]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = (slotId: string) => {
    try {
      Notiflix.Confirm.show(
        "Delete Slot",
        "Are you sure you want to delete this slot",
        "Yes",
        "No",
        async () => {
          try {
            await deleteSlot(slotId);
            setSlots((prev) => prev.filter((slot) => slot._id !== slotId));
            toast.success("Slot removed successfully");
          } catch (error) {
            toast.error("Try deleting after sometime.");
          }
        },
        () => {
          Notiflix.Notify.failure("Delete Slot cancelled.");
        },
        {
          okButtonBackground: "#28a745",
          cancelButtonBackground: "#6c757d",
        }
      );
    } catch (error) {
      toast.error("Failed to remove slot");
    }
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      endDate: "",
      startTime: "",
      endTime: "",
      recurring: false,
      frequency: "daily",
      weekdays: [] as number[],
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Start date is required"),
      endDate: Yup.string().when("recurring", {
        is: true,
        then: (schema) => schema.required("End date is required"),
      }),
      startTime: Yup.string().required("Start time is required"),
      endTime: Yup.string().required("End time is required"),
    }),
    onSubmit: async (values) => {
      try {
        let newSlots = [];

        if (!values.recurring) {
          const newSlot = {
            date: values.date,
            startTime: values.startTime,
            endTime: values.endTime,
            status: "Available",
            doctorId: parsedDoctorInfo._id,
          };
          const addSlot = await addDoctorSlots(newSlot);
      

          if (addSlot.data.message === "Slot added successfully!") {
            setRefreshSlots((prev) => !prev); 
          }

          newSlots = [newSlot];
        } else {
          const startDate = new Date(`${values.date}T${values.startTime}`);
          const endDate = new Date(`${values.endDate}T${values.startTime}`);

          const ruleOptions: any = { dtstart: startDate, until: endDate };

          if (values.frequency === "daily") {
            ruleOptions.freq = RRule.DAILY;
          } else if (values.frequency === "weekly") {
            ruleOptions.freq = RRule.WEEKLY;
            const weekdayMap = [
              RRule.SU,
              RRule.MO,
              RRule.TU,
              RRule.WE,
              RRule.TH,
              RRule.FR,
              RRule.SA,
            ];
            ruleOptions.byweekday = values.weekdays.map((day) => weekdayMap[day]);
          }

          const rule = new RRule(ruleOptions);
          newSlots = rule.all().map((slotDate) => ({
            date: new Date(slotDate).toISOString().split("T")[0],
            startTime: values.startTime,
            endTime: values.endTime,
            status: "Available",
            doctorId: parsedDoctorInfo._id,
          }));

         const slotResponse= await addDoctorSlots(newSlots);
         if (slotResponse.data.message === "Slot added successfully!") {
            setRefreshSlots((prev) => !prev); 
          }
        }

        toast.success("Slot(s) added successfully!");
        setCurrentPage(1); // Reset to first page
        handleClose();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className="text-2xl md:text-3xl font-extrabold text-customHeaderBlue text-center w-full">
          ✥ Add Available Slots
        </h1>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#14b8a6",
            color: "#fff",
            px: 3,
            py: 1.5,
            fontWeight: 600,
            fontSize: "16px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            textTransform: "none",
            position: "absolute",
            top: 20,
            right: 40,
            '&:hover': {
              backgroundColor: "#0d9488",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={handleOpen}
        >
          ✙ Add Slots
        </Button>


      </div>


      {/* Slot Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Add Slots</DialogTitle>
        <DialogContent>
          <div className="w-[540px]">
            <form onSubmit={formik.handleSubmit}>
              {/* Start Date */}
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-semibold mb-2">
                  Start Date
                </label>
                <TextField
                  fullWidth
                  type="date"
                  name="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                  inputProps={{ min: new Date().toISOString().split("T")[0] }}
                  error={!!formik.errors.date}
                  helperText={formik.errors.date}
                  className="mb-2"
                />
              </div>

              {/* End Date (if recurring) */}
              {formik.values.recurring && (
                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-sm font-semibold mb-2">
                    End Date
                  </label>
                  <TextField
                    fullWidth
                    type="date"
                    name="endDate"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                    inputProps={{
                      min: formik.values.date || new Date().toISOString().split("T")[0],
                      // max: getMaxEndDate(formik.values.date, 7), // LIMIT END DATE TO 7 DAYS
                    }}
                    error={!!formik.errors.endDate}
                    helperText={formik.errors.endDate}
                    className="mb-2"
                  />
                </div>
              )}

              {/* Start Time */}
              <div className="mb-4">
                <label htmlFor="startTime" className="block text-sm font-semibold mb-2">
                  Start Time
                </label>
                <TextField
                  fullWidth
                  type="time"
                  name="startTime"
                  onChange={formik.handleChange}
                  value={formik.values.startTime}
                  error={!!formik.errors.startTime}
                  helperText={formik.errors.startTime}
                  className="mb-2"
                />
              </div>

              {/* End Time */}
              <div className="mb-4">
                <label htmlFor="endTime" className="block text-sm font-semibold mb-2">
                  End Time
                </label>
                <TextField
                  fullWidth
                  type="time"
                  name="endTime"
                  onChange={formik.handleChange}
                  value={formik.values.endTime}
                  error={!!formik.errors.endTime}
                  helperText={formik.errors.endTime}
                  className="mb-2"
                />
              </div>

              {/* Recurring Checkbox */}
              <div className="mb-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.recurring}
                      onChange={() =>
                        formik.setFieldValue("recurring", !formik.values.recurring)
                      }
                    />
                  }
                  label="Recurring Slot"
                />
              </div>

              {/* Frequency and Weekdays (if recurring) */}
              {formik.values.recurring && (
                <>
                  <div className="mb-4">
                    <label htmlFor="frequency" className="block text-sm font-semibold mb-2">
                      Frequency
                    </label>
                    <TextField
                      select
                      fullWidth
                      name="frequency"
                      value={formik.values.frequency}
                      onChange={formik.handleChange}
                      className="mb-2"
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                    </TextField>
                  </div>

                  {formik.values.frequency === "weekly" && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">Select Weekdays</label>
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day, index) => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              checked={formik.values.weekdays.includes(index)}
                              onChange={() =>
                                formik.setFieldValue(
                                  "weekdays",
                                  formik.values.weekdays.includes(index)
                                    ? formik.values.weekdays.filter((d) => d !== index)
                                    : [...formik.values.weekdays, index]
                                )
                              }
                            />
                          }
                          label={day}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Slot Table */}
      <table style={{ width: "100%", marginTop: "44px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>End Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.date}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.startTime}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{slot.endTime}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <span style={{ color: slot.status === "Available" ? "#39FF14" : "inherit", fontWeight: "bold" }}>
                  {slot.status}
                </span>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {slot.status === "Booked" ? (
                  <span style={{ color: "#1F51FF", fontWeight: "bold" }}>Slot Booked</span>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleRemove(slot._id)}
                  >
                    Remove
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {Math.ceil(totalSlots / slotsPerPage)}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalSlots / slotsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DoctorAddSlot;
