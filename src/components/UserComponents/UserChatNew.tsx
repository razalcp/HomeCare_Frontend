// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useSocket } from "src/context/socketContext";
// import { bookedDoctors, deleteMessage, fetchMessages, sendMessage, uploadToCloudinary } from "src/services/user/userApi";
// import { useRef } from "react";

// interface Contact {
//     _id: string;
//     name: string;
//     email: string;
//     profileImage?: string;
// }

// interface Message {
//     _id: string;
//     senderId: string;
//     receiverId: string;
//     message: string;
//     image: string;
//     createdAt: string;
// }

// export default function UserChatNew() {
//     const [contacts, setContacts] = useState<Contact[]>([]);
//     const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [userId, setUserId] = useState<string | null>(null);
//     const [imageUrl, setImageUrl] = useState<string | null>("")
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
//     const [fullPreviewImage, setFullPreviewImage] = useState<string | null>(null);



//     const { createSocket, socket } = useSocket()

//     const chatAreaRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 chatAreaRef.current &&
//                 !chatAreaRef.current.contains(event.target as Node)
//             ) {
//                 setSelectedMessageId(null);
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
//         const userInfo = localStorage.getItem('userInfo');
//         if (userInfo) {
//             const parsedUser = JSON.parse(userInfo);
//             setUserId(parsedUser._id);
//         }
//     }, []);

//     // useEffect(() => {
//     //     async function getBookedDoctors() {
//     //         try {
//     //             const userData = await bookedDoctors();

//     //             setContacts(userData as Contact[]);
//     //         } catch (error) {
//     //             console.error("Error fetching booked users:", error);
//     //         }
//     //     }
//     //     getBookedDoctors();
//     // }, []);
//     useEffect(() => {
//         async function getBookedDoctors() {
//             try {
//                 const userData = await bookedDoctors();
//                 console.log(userData);

//                 if (Array.isArray(userData)) {
//                     setContacts(userData);
//                 } else {
//                     setContacts([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching booked users:", error);
//                 setContacts([]);
//             }
//         }
//         getBookedDoctors();
//     }, []);


//     useEffect(() => {
//         async function loadMessages() {
//             console.log("load");

//             if (selectedContact) {
//                 try {
//                     const msgs = await fetchMessages(selectedContact._id, userId as string);


//                     setMessages(msgs as Message[]);
//                     // console.log("This is messages",messages);


//                 } catch (error) {
//                     console.error("Error fetching messages:", error);
//                 }
//             }
//         }
//         loadMessages();
//     }, [selectedContact, userId]);

//     const handleSendMessage = async () => {
//         if (!selectedContact || !userId) return;
//         // console.log("Sending message:", {
//         //     message: newMessage,
//         //     senderId: userId,
//         //     receiverId: selectedContact._id,
//         //     image: imageUrl
//         // });
//         ;
//         try {
//             const msg = await sendMessage({
//                 senderId: userId,
//                 receiverId: selectedContact._id,
//                 message: newMessage,
//                 image: imageUrl
//             });
//             socket?.emit('sendMessage', msg);

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
//         if (!file || !selectedContact || !userId) return;
//         const localUrl = URL.createObjectURL(file);
//         setImagePreview(localUrl);
//         const formData = new FormData();
//         formData.append("file", file);
//         // const fileUrl: any = await uploadToCloudinary(formData)

//         // setImageUrl(fileUrl)
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
//             const updateData = await deleteMessage(messageId)
//             // await deleteMessageAPI(messageId);
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
//                                 <img className="w-10 h-10 rounded-full" src={contact.profileImage} alt="" />
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
//                 {/* Chat Header */}
//                 {selectedContact ? (
//                     <div className="p-4 bg-white border-b border-gray-300 flex items-center relative">
//                         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 text-white font-bold uppercase">
//                             <img className="w-10 h-10 rounded-full" src={selectedContact.profileImage} alt="" />
//                         </div>
//                         <div className="font-medium">{selectedContact.name}</div>

//                         {/* Delete Button - Positioned at the right corner */}
//                         {selectedMessageId && (
//                             <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
//                                 <button
//                                     onClick={() => confirmDelete(selectedMessageId)}
//                                     className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg"
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
//                         {/* {messages.length === 0 ? (
//                             <div className="text-center text-gray-400">
//                                 No messages yet. Start the conversation!
//                             </div>
//                         ) : (
//                             messages.map((msg) => (
//                                 <div
//                                     key={msg._id}
//                                     className={`flex ${msg.senderId.toString() === userId ? "justify-end" : "justify-start"}`}
//                                 >
//                                     <div className="bg-blue-500 text-white px-4 py-2 rounded-full max-w-xs">
//                                         {msg.message}
//                                     </div>
//                                 </div>
//                             ))
//                         )} */}
//                         {messages
//                             .filter((msg) => msg.message.trim() !== "" || msg.image) // Filter out empty messages with no image
//                             .map((msg) => {
//                                 const time = new Date(msg.createdAt).toLocaleTimeString([], {
//                                     hour: '2-digit',
//                                     minute: '2-digit',
//                                 });

//                                 return (
//                                     // <div
//                                     //     key={msg._id}
//                                     //     className={`flex flex-col ${msg.senderId.toString() === userId ? "items-end" : "items-start"}`}
//                                     // >
//                                     <div
//                                         key={msg._id}
//                                         onClick={() => setSelectedMessageId(msg._id)}
//                                         className={` relative flex flex-col cursor-pointer transition
//                                                       ${msg.senderId.toString() === userId ? "items-end" : "items-start"}
//                                                ${selectedMessageId === msg._id ? "bg-gray-200 rounded-md" : ""}
//                                                 `}
//                                     >
//                                         {/* Render message only if not empty */}
//                                         {msg.message.trim() !== "" && (
//                                             <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs">
//                                                 {msg.message}
//                                             </div>
//                                         )}

//                                         {/* Render image if it exists */}
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
//                         <label htmlFor="fileUpload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full">
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
////////////////////////////////////////////////////////////////////////////////////////////////


import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSocket } from "src/context/socketContext";
import { bookedDoctors, deleteMessage, fetchMessages, sendMessage, uploadToCloudinary } from "src/services/user/userApi";
import { useRef } from "react";

interface Contact {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
}

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    image: string;
    createdAt: string;
}

export default function UserChatNew() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>("")
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [fullPreviewImage, setFullPreviewImage] = useState<string | null>(null);

    const { createSocket, socket } = useSocket()

    const chatAreaRef = useRef<HTMLDivElement>(null);

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
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUserId(parsedUser._id);
        }
    }, []);

    // Function to remove duplicate doctors based on their _id
    const removeDuplicateDoctors = (doctors: Contact[]): Contact[] => {
        const uniqueDoctors = doctors.filter((doctor, index, self) =>
            index === self.findIndex((d) => d._id === doctor._id)
        );
        return uniqueDoctors;
    };

    useEffect(() => {
        async function getBookedDoctors() {
            try {
                const userData = await bookedDoctors();
                console.log("Raw doctor data:", userData);

                if (Array.isArray(userData)) {
                    // Remove duplicates before setting contacts
                    const uniqueDoctors = removeDuplicateDoctors(userData);
                    console.log("Unique doctors after deduplication:", uniqueDoctors);
                    setContacts(uniqueDoctors);
                } else {
                    setContacts([]);
                }
            } catch (error) {
                console.error("Error fetching booked users:", error);
                setContacts([]);
            }
        }
        getBookedDoctors();
    }, []);

    useEffect(() => {
        async function loadMessages() {
            console.log("load");

            if (selectedContact) {
                try {
                    const msgs = await fetchMessages(selectedContact._id, userId as string);
                    setMessages(msgs as Message[]);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        }
        loadMessages();
    }, [selectedContact, userId]);

    const handleSendMessage = async () => {
        if (!selectedContact || !userId) return;

        try {
            const msg = await sendMessage({
                senderId: userId,
                receiverId: selectedContact._id,
                message: newMessage,
                image: imageUrl
            });
            socket?.emit('sendMessage', msg);

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
        if (!file || !selectedContact || !userId) return;
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
            const updateData = await deleteMessage(messageId)
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
            
            {/* Contacts Sidebar */}
            <div className="w-[30%] bg-white border-r border-gray-300 flex flex-col">
                <div className="p-4 font-bold text-lg border-b">
                    Chats ({contacts.length})
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No doctors to chat with yet
                        </div>
                    ) : (
                        contacts.map((contact) => (
                            <div
                                key={contact._id}
                                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                                    selectedContact?._id === contact._id ? "bg-gray-200" : ""
                                }`}
                                onClick={() => setSelectedContact(contact)}
                            >
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 text-white font-bold uppercase">
                                    <img className="w-10 h-10 rounded-full" src={contact.profileImage} alt="" />
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
                            <img className="w-10 h-10 rounded-full" src={selectedContact.profileImage} alt="" />
                        </div>
                        <div className="font-medium">{selectedContact.name}</div>

                        {/* Delete Button - Positioned at the right corner */}
                        {selectedMessageId && (
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                <button
                                    onClick={() => confirmDelete(selectedMessageId)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg"
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
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });

                                return (
                                    <div
                                        key={msg._id}
                                        onClick={() => setSelectedMessageId(msg._id)}
                                        className={`relative flex flex-col cursor-pointer transition
                                                  ${msg.senderId.toString() === userId ? "items-end" : "items-start"}
                                           ${selectedMessageId === msg._id ? "bg-gray-200 rounded-md" : ""}
                                        `}
                                    >
                                        {/* Render message only if not empty */}
                                        {msg.message.trim() !== "" && (
                                            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs">
                                                {msg.message}
                                            </div>
                                        )}

                                        {/* Render image if it exists */}
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
                        <label htmlFor="fileUpload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full">
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
