// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useSocket } from "src/context/socketContext";
// import { bookedUsers, fetchMessages, savePrescription, sendMessage } from "src/services/doctor/doctorapi";
// import { deleteMessage, uploadToCloudinary } from "src/services/user/userApi";
// import { useRef } from "react";
// import { FaVideo } from "react-icons/fa";
// import { setVideoCall, setPrescription } from "src/Redux/Slice/doctorSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// interface Contact {
//     _id: string;
//     name: string;
//     email: string;
//     mobile: string;
//     profileIMG?: string;
//     bookingId: string;
// }

// interface Message {
//     _id: string;
//     senderId: string;
//     receiverId: string;
//     message: string;
//     image: string;
//     createdAt: string;
// }

// interface Medication {
//     name: string;
//     dosage: string;
//     count: string;

//     instruction: string;
// }

// export default function DoctorChatNew() {
//     const [contacts, setContacts] = useState<Contact[]>([]);
//     const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [doctorId, setDoctorId] = useState<string | null>(null);
//     const [imageUrl, setImageUrl] = useState<string | null>("");
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
//     const [fullPreviewImage, setFullPreviewImage] = useState<string | null>(null);
//     const [doctorData, setDoctorData] = useState<any>(null);
//     const [userData, setUserData] = useState<any>(null);
//     const [patientAdvice, setPatientAdvice] = useState<string>("");
//     const [medications, setMedications] = useState<Medication[]>([
//         { name: "", dosage: "", count: "", instruction: "" }
//     ]);

//     const { createSocket, socket } = useSocket();

//     const chatAreaRef = useRef<HTMLDivElement>(null);
//     const dispatch = useDispatch();
//     const { showPrescription } = useSelector((state: any) => state.doctor);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 chatAreaRef.current &&
//                 !chatAreaRef.current.contains(event.target as Node)
//             ) {
//                 setSelectedMessageId(null); // Clear selected message
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     useEffect(() => {
//         if (!socket) return;

//         const handleIncomingMessage = (message: Message) => {
//             console.log("socket received message", message);
//             setMessages((prev) => [...prev, message]);
//         };

//         socket.on("sendMessage", handleIncomingMessage);

//         // Cleanup the listener on unmount
//         return () => {
//             socket.off("sendMessage", handleIncomingMessage);
//         };
//     }, [socket]);

//     useEffect(() => {
//         const doctorInfo = localStorage.getItem("doctorInfo");
//         const userInfo = localStorage.getItem("userInfo");

//         if (doctorInfo) {
//             const parsedDoctor = JSON.parse(doctorInfo);
//             setDoctorId(parsedDoctor._id);
//             setDoctorData(parsedDoctor);
//         }
//         if (userInfo) {
//             const parsedUser = JSON.parse(userInfo);
//             setUserData(parsedUser);
//         }
//     }, []);

//     useEffect(() => {
//         async function getBookedUsers() {
//             try {
//                 const userData = await bookedUsers();
//                 setContacts(userData as Contact[]);
//                 console.log("contacts", userData);

//             } catch (error) {
//                 console.error("Error fetching booked users:", error);
//             }
//         }
//         getBookedUsers();
//     }, []);

//     useEffect(() => {
//         async function loadMessages() {
//             if (selectedContact) {
//                 try {
//                     const msgs = await fetchMessages(selectedContact._id, doctorId as string);
//                     setMessages(msgs as Message[]);
//                 } catch (error) {
//                     console.error("Error fetching messages:", error);
//                 }
//             }
//         }
//         loadMessages();
//     }, [selectedContact, doctorId]);

//     const handleSendMessage = async () => {
//         if (!selectedContact || !doctorId) return;

//         try {
//             const msg = await sendMessage({
//                 senderId: doctorId,
//                 receiverId: selectedContact._id,
//                 message: newMessage,
//                 image: imageUrl,
//             });
//             socket?.emit("sendMessage", msg);

//             setMessages((prev: any) => [...prev, msg]);
//             setNewMessage("");
//             setImagePreview(null);
//             setImageUrl(null);
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file || !selectedContact || !doctorId) return;
//         const localUrl = URL.createObjectURL(file);
//         setImagePreview(localUrl);
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             setUploading(true); // show loader / disable send
//             const fileUrl: any = await uploadToCloudinary(formData);
//             setImageUrl(fileUrl);
//         } catch (err) {
//             console.error("Upload failed", err);
//         } finally {
//             setUploading(false); // re-enable send
//         }
//     };

//     const handleDeleteMessage = async (messageId: string) => {
//         try {
//             console.log("messageId", messageId);
//             const updateData = await deleteMessage(messageId);
//             setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
//             setSelectedMessageId(null);
//             toast.success("Message deleted");
//         } catch (err) {
//             toast.error("Failed to delete message");
//         }
//     };

//     const confirmDelete = (messageId: string) => {
//         toast("Are you sure you want to delete this message?", {
//             action: {
//                 label: "Delete",
//                 onClick: () => handleDeleteMessage(messageId),
//             },
//             cancel: {
//                 label: "Cancel",
//                 onClick: () => {
//                     setSelectedMessageId(null);
//                     console.log("Delete cancelled");
//                 },
//             },
//         });
//     };

//     const navigateVideoChat = () => {
//         const contactBooking = contacts.find((contact) => contact._id === selectedContact?._id);
//         const bookingId: any = contactBooking?.bookingId || "";
//         if (!userData || !doctorData) return;

//         dispatch(
//             setVideoCall({
//                 userID: userData._id || "",
//                 type: "out-going",
//                 callType: "video",
//                 roomId: `${Date.now()}`,
//                 userName: `${userData?.name}`,
//                 userImage: `${userData?.profileIMG}`,
//                 doctorName: `${doctorData.name}`,
//                 doctorImage: ` ${doctorData.profileImage}`,
//                 bookingId: bookingId,
//             })
//         );
//     };

//     const openPrescriptionModal = () => {
//         dispatch(setPrescription(true));
//     };

//     const closePrescriptionModal = () => {
//         dispatch(setPrescription(false));
//     };

//     const handleSavePrescription = async () => {
//         const presData = {
//             bookingId: selectedContact?.bookingId,
//             patientAdvice: patientAdvice,
//             medications: medications,
//             userId: selectedContact?._id,
//             doctorId: doctorData._id
//         }

//         const response = await savePrescription(presData as any)
//         // Implement your save prescription logic here
//         toast.success("Prescription saved successfully");
//         closePrescriptionModal();
//     };

//     const handleAddMedication = () => {
//         setMedications([...medications, { name: "", dosage: "", count: "", instruction: "" }]);
//     };

//     const handleRemoveMedication = (index: number) => {
//         const updatedMedications = [...medications];
//         updatedMedications.splice(index, 1);
//         setMedications(updatedMedications);
//     };

//     const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
//         const newMedications = [...medications];
//         newMedications[index][field] = value;
//         setMedications(newMedications);
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {fullPreviewImage && (
//                 <div
//                     onClick={() => setFullPreviewImage(null)}
//                     className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//                 >
//                     <img
//                         src={fullPreviewImage}
//                         alt="Full Preview"
//                         className="max-h-[90%] max-w-[90%] rounded shadow-lg"
//                     />
//                 </div>
//             )}

//             {uploading && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//                     <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
//                 </div>
//             )}

//             {/* Prescription Modal */}
//             {showPrescription && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-y-auto">
//                         <div className="p-6">
//                             <h2 className="text-2xl font-bold mb-6">Patient Informations</h2>

//                             {/* Patient Information */}
//                             <div className="bg-gray-200 p-4 rounded-md mb-6">
//                                 <div className="grid grid-cols-4 gap-4">
//                                     <div>
//                                         <h3 className="font-medium text-sm">Patient Image</h3>
//                                         <img alt="Patient"
//                                             className="w-16 h-16 rounded-full object-cover" src={selectedContact?.profileIMG} alt="" />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-medium text-sm">Patient Name</h3>
//                                         <p>{selectedContact?.name ? `${selectedContact?.name}` : "N/A"}</p>
//                                     </div>
//                                     <div>
//                                         <h3 className="font-medium text-sm">Age / Gender</h3>
//                                         <p>{selectedContact?.name ? `${selectedContact?.age} / ${selectedContact?.gender}` : "N/A"}</p>
//                                     </div>

//                                     <div>
//                                         <h3 className="font-medium text-sm">Blood Group</h3>
//                                         <p>{selectedContact?.bloodGroup ? selectedContact?.bloodGroup : "N/A"}</p>
//                                     </div>

//                                 </div>
//                             </div>

//                             {/* Medical Records */}


//                             {/* Medications */}
//                             <div className="mb-6">
//                                 <div className="flex justify-between items-center mb-3">
//                                     <h3 className="text-lg font-bold">Medications</h3>
//                                     <button
//                                         onClick={handleAddMedication}
//                                         className="text-blue-500 hover:text-blue-700"
//                                     >
//                                         Add new
//                                     </button>
//                                 </div>
//                                 <div className="bg-gray-200 p-4 rounded-md">
//                                     {medications.map((med, index) => (
//                                         <div key={index} className="grid grid-cols-6 gap-2 mb-2">
//                                             <input
//                                                 type="text"
//                                                 value={med.name}
//                                                 onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
//                                                 placeholder="Name"
//                                                 className="border p-2 rounded"
//                                             />
//                                             <input
//                                                 type="text"
//                                                 value={med.dosage}
//                                                 onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
//                                                 placeholder="Dosage"
//                                                 className="border p-2 rounded"
//                                             />
//                                             <input
//                                                 type="text"
//                                                 value={med.count}
//                                                 onChange={(e) => handleMedicationChange(index, "count", e.target.value)}
//                                                 placeholder="Count"
//                                                 className="border p-2 rounded"
//                                             />

//                                             <input
//                                                 type="text"
//                                                 value={med.instruction}
//                                                 onChange={(e) => handleMedicationChange(index, "instruction", e.target.value)}
//                                                 placeholder="Instruction"
//                                                 className="border p-2 rounded"
//                                             />
//                                             <button
//                                                 onClick={() => handleRemoveMedication(index)}
//                                                 className="text-red-500 hover:text-red-700"
//                                             >
//                                                 🗑️
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Advice */}
//                             <div className="mb-6">
//                                 <h3 className="text-lg font-bold mb-3">Advice</h3>
//                                 <div className="bg-gray-200 p-4 rounded-md">
//                                     <textarea
//                                         value={patientAdvice}
//                                         onChange={(e) => setPatientAdvice(e.target.value)}
//                                         placeholder="Give an Advice to this Patient For retain his health condition to better"
//                                         className="w-full p-3 border rounded-md"
//                                         rows={4}
//                                     ></textarea>
//                                 </div>
//                             </div>

//                             {/* Action buttons */}
//                             <div className="flex justify-end gap-3 mt-6">
//                                 <button
//                                     onClick={closePrescriptionModal}
//                                     className="px-6 py-2 border border-gray-300 rounded-md"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSavePrescription}
//                                     className="px-6 py-2 bg-blue-800 text-white rounded-md"
//                                 >
//                                     Save & End Consultation
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Contacts Sidebar */}
//             <div className="w-[30%] bg-white border-r border-gray-300 flex flex-col">
//                 <div className="p-4 font-bold text-lg border-b">Chats</div>
//                 <div className="flex-1 overflow-y-auto">
//                     {contacts.map((contact) => (
//                         <div
//                             key={contact._id}
//                             className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${selectedContact?._id === contact._id ? "bg-gray-200" : ""
//                                 }`}
//                             onClick={() => setSelectedContact(contact)}
//                         >
//                             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 text-white font-bold uppercase">
//                                 <img className="w-10 h-10 rounded-full" src={contact.profileIMG} alt="" />
//                             </div>
//                             <div className="flex-1">
//                                 <div className="font-medium">{contact.name}</div>
//                                 <div className="text-sm text-gray-500">Tap to chat</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Chat Area */}
//             <div className="flex-1 flex flex-col bg-chat-bg" ref={chatAreaRef}>
//                 {/* Chat Header */}
//                 {selectedContact ? (
//                     <div className="p-4 bg-white border-b border-gray-300 flex items-center relative">
//                         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 text-white font-bold uppercase">
//                             <img className="w-10 h-10 rounded-full" src={selectedContact.profileIMG} alt="" />
//                         </div>
//                         <div className="font-medium">{selectedContact.name}</div>

//                         <div className="ml-auto flex gap-3">
//                            {/* <button
//                                 className="bg-green-500 px-4 py-2 rounded-lg text-white"
//                                 onClick={openPrescriptionModal}
//                             >
//                                 Write Prescription
//                             </button> */}
//                             <button
//                                 className="flex justify-center gap-3 bg-teal-500 px-4 py-2 rounded-lg"
//                                 onClick={navigateVideoChat}
//                             >
//                                 <h1 className="text-1xl text-white">Start Session</h1>
//                                 <FaVideo className="h-6 w-6" />
//                             </button>
//                         </div>

//                         {/* Delete Button - Positioned at the right corner */}
//                         {selectedMessageId && (
//                             <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
//                                 <button
//                                     onClick={() => confirmDelete(selectedMessageId)}
//                                     className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg mr-[172px]"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                         Select a contact to start chatting
//                     </div>
//                 )}

//                 {/* Chat Messages */}
//                 {selectedContact && (
//                     <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
//                         {messages
//                             .filter((msg) => msg.message.trim() !== "" || msg.image) // Filter out empty messages with no image
//                             .map((msg) => {
//                                 const time = new Date(msg.createdAt).toLocaleTimeString([], {
//                                     hour: "2-digit",
//                                     minute: "2-digit",
//                                 });

//                                 return (
//                                     <div
//                                         key={msg._id}
//                                         onClick={() => setSelectedMessageId(msg._id)}
//                                         className={`
//                                       relative flex flex-col cursor-pointer transition
//                                       ${msg.senderId.toString() === doctorId ? "items-end" : "items-start"}
//                                       ${selectedMessageId === msg._id ? "bg-gray-200 rounded-md" : ""}
//                                     `}
//                                     >
//                                         {msg.message.trim() !== "" && (
//                                             <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs">
//                                                 {msg.message}
//                                             </div>
//                                         )}

//                                         {msg.image && (
//                                             <img
//                                                 src={msg.image}
//                                                 alt="uploaded"
//                                                 onDoubleClick={() => setFullPreviewImage(msg.image)}
//                                                 className="max-w-[200px] rounded mt-1 cursor-pointer transition hover:opacity-80"
//                                             />
//                                         )}

//                                         <div className="text-xs text-gray-500 mt-1">{time}</div>
//                                     </div>
//                                 );
//                             })}
//                     </div>
//                 )}

//                 {/* Input Box */}
//                 {imagePreview && (
//                     <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-2">
//                         <div className="flex items-center space-x-2">
//                             <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
//                             <button
//                                 onClick={() => {
//                                     setImagePreview(null);
//                                     setImageUrl(null);
//                                 }}
//                                 className="text-red-500 hover:underline"
//                             >
//                                 ❌ Remove
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {selectedContact && (
//                     <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-2">
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileUpload}
//                             className="hidden"
//                             id="fileUpload"
//                         />
//                         <label
//                             htmlFor="fileUpload"
//                             className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full"
//                         >
//                             📎
//                         </label>

//                         <input
//                             type="text"
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             placeholder="Type a message"
//                             className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         <button
//                             onClick={handleSendMessage}
//                             disabled={uploading}
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
//                         >
//                             {uploading ? "Uploading..." : "Send"}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSocket } from "src/context/socketContext";
import { bookedUsers, fetchMessages, savePrescription, sendMessage } from "src/services/doctor/doctorapi";
import { deleteMessage, uploadToCloudinary } from "src/services/user/userApi";
import { useRef } from "react";
import { FaVideo } from "react-icons/fa";
import { setVideoCall, setPrescription } from "src/Redux/Slice/doctorSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface Contact {
    consultationStatus: string;
    _id: string;
    name: string;
    email: string;
    mobile: string;
    profileIMG?: string;
    bookingId: string;
}

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    image: string;
    createdAt: string;
}

interface Medication {
    name: string;
    dosage: string;
    count: string;
    instruction: string;
}

export default function DoctorChatNew() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [fullPreviewImage, setFullPreviewImage] = useState<string | null>(null);
    const [doctorData, setDoctorData] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [patientAdvice, setPatientAdvice] = useState<string>("");
    const [medications, setMedications] = useState<Medication[]>([
        { name: "", dosage: "", count: "", instruction: "" }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState("");
    const [uniqueContact, setUniqueContact] = useState<Contact[]>([])
    const [completedPrescription, SetCompletedPrescription] = useState(false)
    const { createSocket, socket } = useSocket();

    const chatAreaRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const { showPrescription } = useSelector((state: any) => state.doctor);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                chatAreaRef.current &&
                !chatAreaRef.current.contains(event.target as Node)
            ) {
                setSelectedMessageId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleIncomingMessage = (message: Message) => {
            console.log("socket received message", message);
            setMessages((prev) => [...prev, message]);
        };

        socket.on("sendMessage", handleIncomingMessage);

        return () => {
            socket.off("sendMessage", handleIncomingMessage);
        };
    }, [socket]);

    useEffect(() => {
        const doctorInfo = localStorage.getItem("doctorInfo");
        const userInfo = localStorage.getItem("userInfo");

        if (doctorInfo) {
            const parsedDoctor = JSON.parse(doctorInfo);
            setDoctorId(parsedDoctor._id);
            setDoctorData(parsedDoctor);
        }
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUserData(parsedUser);
        }
    }, []);

    // Function to remove duplicate users based on their _id
    const removeDuplicateUsers = (users: Contact[]): Contact[] => {
        const uniqueUsers = users.filter((user, index, self) =>
            index === self.findIndex((u) => u._id === user._id)
        );
        return uniqueUsers;
    };

    useEffect(() => {
        async function getBookedUsers() {
            try {
                const userData = await bookedUsers();
                console.log("Raw user data:", userData);

                await setContacts(userData as any)


                if (Array.isArray(userData)) {
                    // Remove duplicates before setting contacts
                    const uniqueUsers = removeDuplicateUsers(userData);
                    console.log("Unique users after deduplication:", uniqueUsers);
                    setUniqueContact(uniqueUsers);
                } else {
                    setUniqueContact([]);
                }
            } catch (error) {
                console.error("Error fetching booked users:", error);
                setContacts([]);
            }
        }
        getBookedUsers();
    }, [completedPrescription]);

    useEffect(() => {
        async function loadMessages() {
            if (selectedContact) {
                try {
                    const msgs = await fetchMessages(selectedContact._id, doctorId as string);
                    setMessages(msgs as Message[]);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        }
        loadMessages();
    }, [selectedContact, doctorId]);

    const handleSendMessage = async () => {
        if (!selectedContact || !doctorId) return;

        try {
            const msg = await sendMessage({
                senderId: doctorId,
                receiverId: selectedContact._id,
                message: newMessage,
                image: imageUrl,
            });
            socket?.emit("sendMessage", msg);

            setMessages((prev: any) => [...prev, msg]);
            setNewMessage("");
            setImagePreview(null);
            setImageUrl(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedContact || !doctorId) return;
        const localUrl = URL.createObjectURL(file);
        setImagePreview(localUrl);
        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const fileUrl: any = await uploadToCloudinary(formData);
            setImageUrl(fileUrl);
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        try {
            console.log("messageId", messageId);
            const updateData = await deleteMessage(messageId);
            setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
            setSelectedMessageId(null);
            toast.success("Message deleted");
        } catch (err) {
            toast.error("Failed to delete message");
        }
    };

    const confirmDelete = (messageId: string) => {
        toast("Are you sure you want to delete this message?", {
            action: {
                label: "Delete",
                onClick: () => handleDeleteMessage(messageId),
            },
            cancel: {
                label: "Cancel",
                onClick: () => {
                    setSelectedMessageId(null);
                    console.log("Delete cancelled");
                },
            },
        });
    };
    const handleSubmit = () => {
        if (!selectedBookingId) return alert("Please select a booking.");
        console.log("Selected Booking ID:", selectedBookingId);
        setShowModal(false);
        // Navigate or handle further logic with selectedBookingId
        navigateVideoChat()
    };
    const navigateVideoChat = () => {
        const contactBooking = contacts.find((contact) => contact._id === selectedContact?._id);
        const bookingId: any = contactBooking?.bookingId || "";
        if (!userData || !doctorData) return;

        dispatch(
            setVideoCall({
                userID: userData._id || "",
                type: "out-going",
                callType: "video",
                roomId: `${Date.now()}`,
                userName: `${userData?.name}`,
                userImage: `${userData?.profileIMG}`,
                doctorName: `${doctorData.name}`,
                doctorImage: ` ${doctorData.profileImage}`,
                bookingId: selectedBookingId,
            })
        );
    };

    const openPrescriptionModal = () => {
        dispatch(setPrescription(true));
    };

    const closePrescriptionModal = () => {
        SetCompletedPrescription(true)
        dispatch(setPrescription(false));

    };

    const handleSavePrescription = async () => {
        console.log("Selected Booking ID inside handleSavePrescription: ", selectedBookingId);
        const presData = {
            bookingId: selectedBookingId,
            patientAdvice: patientAdvice,
            medications: medications,
            userId: selectedContact?._id,
            doctorId: doctorData._id
        }

        const response = await savePrescription(presData as any)
        toast.success("Prescription saved successfully");
        closePrescriptionModal();
    };

    const handleAddMedication = () => {
        setMedications([...medications, { name: "", dosage: "", count: "", instruction: "" }]);
    };

    const handleRemoveMedication = (index: number) => {
        const updatedMedications = [...medications];
        updatedMedications.splice(index, 1);
        setMedications(updatedMedications);
    };

    const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
        const newMedications = [...medications];
        newMedications[index][field] = value;
        setMedications(newMedications);
    };

    return (


        <div className="flex h-screen bg-gray-100">
            {fullPreviewImage && (
                <div
                    onClick={() => setFullPreviewImage(null)}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                >
                    <img
                        src={fullPreviewImage}
                        alt="Full Preview"
                        className="max-h-[90%] max-w-[90%] rounded shadow-lg"
                    />
                </div>
            )}

            {uploading && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Prescription Modal */}
            {showPrescription && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[700px] max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Patient Informations</h2>

                            {/* Patient Information */}
                            <div className="bg-gray-200 p-4 rounded-md mb-6">
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <h3 className="font-medium text-sm">Patient Image</h3>
                                        <img alt="Patient"
                                            className="w-16 h-16 rounded-full object-cover" src={selectedContact?.profileIMG} alt="" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">Patient Name</h3>
                                        <p>{selectedContact?.name ? `${selectedContact?.name}` : "N/A"}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">Age / Gender</h3>
                                        <p>{selectedContact?.name ? `${selectedContact?.age} / ${selectedContact?.gender}` : "N/A"}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-sm">Blood Group</h3>
                                        <p>{selectedContact?.bloodGroup ? selectedContact?.bloodGroup : "N/A"}</p>
                                    </div>

                                </div>
                            </div>

                            {/* Medications */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-bold">Medications</h3>
                                    <button
                                        onClick={handleAddMedication}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Add new
                                    </button>
                                </div>
                                <div className="bg-gray-200 p-4 rounded-md">
                                    {medications.map((med, index) => (
                                        <div key={index} className="grid grid-cols-6 gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={med.name}
                                                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                                                placeholder="Name"
                                                className="border p-2 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={med.dosage}
                                                onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                                                placeholder="Dosage"
                                                className="border p-2 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={med.count}
                                                onChange={(e) => handleMedicationChange(index, "count", e.target.value)}
                                                placeholder="Count"
                                                className="border p-2 rounded"
                                            />

                                            <input
                                                type="text"
                                                value={med.instruction}
                                                onChange={(e) => handleMedicationChange(index, "instruction", e.target.value)}
                                                placeholder="Instruction"
                                                className="border p-2 rounded"
                                            />
                                            <button
                                                onClick={() => handleRemoveMedication(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Advice */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-3">Advice</h3>
                                <div className="bg-gray-200 p-4 rounded-md">
                                    <textarea
                                        value={patientAdvice}
                                        onChange={(e) => setPatientAdvice(e.target.value)}
                                        placeholder="Give an Advice to this Patient For retain his health condition to better"
                                        className="w-full p-3 border rounded-md"
                                        rows={4}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={closePrescriptionModal}
                                    className="px-6 py-2 border border-gray-300 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSavePrescription}
                                    className="px-6 py-2 bg-blue-800 text-white rounded-md"
                                >
                                    Save & End Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contacts Sidebar */}
            <div className="w-[30%] bg-white border-r border-gray-300 flex flex-col">
                <div className="p-4 font-bold text-lg border-b">
                    Chats ({uniqueContact.length})
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No patients to chat with yet
                        </div>
                    ) : (
                        uniqueContact.map((contact) => (
                            <div
                                key={contact._id}
                                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${selectedContact?._id === contact._id ? "bg-gray-200" : ""
                                    }`}
                                onClick={() => setSelectedContact(contact)}
                            >
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 text-white font-bold uppercase">
                                    <img className="w-10 h-10 rounded-full" src={contact.profileIMG} alt="" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-gray-500">Tap to chat</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-chat-bg" ref={chatAreaRef}>
                {/* Chat Header */}
                {selectedContact ? (
                    <div className="p-4 bg-white border-b border-gray-300 flex items-center relative">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 text-white font-bold uppercase">
                            <img className="w-10 h-10 rounded-full" src={selectedContact.profileIMG} alt="" />
                        </div>
                        <div className="font-medium">{selectedContact.name}</div>

                        <div className="ml-auto flex gap-3">
                     

                            {contacts.filter((booking) => booking.consultationStatus === "pending").length > 0 && (
                                <>
                                    <button
                                        className="flex justify-center gap-3 bg-teal-500 px-4 py-2 rounded-lg"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <h1 className="text-1xl text-white">Start Session</h1>
                                        <FaVideo className="h-6 w-6 text-white" />
                                    </button>

                                    {/* Modal */}
                                    {showModal && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                            <div className="bg-white p-6 rounded-lg w-96 space-y-4">
                                                <h2 className="text-lg font-semibold">Select a Booking</h2>
                                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                                    {contacts.filter((booking) => booking.consultationStatus === "pending")
                                                        .map((booking) => (
                                                            <label
                                                                key={`${booking.bookingId}-${booking.slotId?._id}`}
                                                                className="flex items-center gap-2 border p-2 rounded-md cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="booking"
                                                                    value={booking.bookingId}
                                                                    checked={selectedBookingId === booking.bookingId}
                                                                    onChange={() => setSelectedBookingId(booking.bookingId)}
                                                                />
                                                                <span>
                                                                    {booking.name} - Booking Date: {booking?.slotId?.date} - Consultation Time: {booking.slotId?.startTime || "N/A"}-{booking.slotId?.endTime}
                                                                </span>
                                                            </label>
                                                        ))}
                                                </div>

                                                <div className="flex justify-end gap-2 pt-4">
                                                    <button
                                                        className="px-4 py-1 rounded bg-gray-300"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="px-4 py-1 rounded bg-teal-600 text-white"
                                                        onClick={handleSubmit}
                                                    >
                                                        Start
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}


                        </div>

                        {/* Delete Button - Positioned at the right corner */}
                        {selectedMessageId && (
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                <button
                                    onClick={() => confirmDelete(selectedMessageId)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg mr-[172px]"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Select a contact to start chatting
                    </div>
                )}

                {/* Chat Messages */}
                {selectedContact && (
                    <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
                        {messages
                            .filter((msg) => msg.message.trim() !== "" || msg.image)
                            .map((msg) => {
                                const time = new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return (
                                    <div
                                        key={msg._id}
                                        onClick={() => setSelectedMessageId(msg._id)}
                                        className={`
                                          relative flex flex-col cursor-pointer transition
                                          ${msg.senderId.toString() === doctorId ? "items-end" : "items-start"}
                                          ${selectedMessageId === msg._id ? "bg-gray-200 rounded-md" : ""}
                                        `}
                                    >
                                        {msg.message.trim() !== "" && (
                                            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs">
                                                {msg.message}
                                            </div>
                                        )}

                                        {msg.image && (
                                            <img
                                                src={msg.image}
                                                alt="uploaded"
                                                onDoubleClick={() => setFullPreviewImage(msg.image)}
                                                className="max-w-[200px] rounded mt-1 cursor-pointer transition hover:opacity-80"
                                            />
                                        )}

                                        <div className="text-xs text-gray-500 mt-1">{time}</div>
                                    </div>
                                );
                            })}
                    </div>
                )}

                {/* Input Box */}
                {imagePreview && (
                    <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                            <button
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageUrl(null);
                                }}
                                className="text-red-500 hover:underline"
                            >
                                ❌ Remove
                            </button>
                        </div>
                    </div>
                )}
                {selectedContact && (
                    <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="fileUpload"
                        />
                        <label
                            htmlFor="fileUpload"
                            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full"
                        >
                            📎
                        </label>

                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message"
                            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={uploading}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                        >
                            {uploading ? "Uploading..." : "Send"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}