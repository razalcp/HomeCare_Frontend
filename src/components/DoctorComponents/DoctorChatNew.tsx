import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSocket } from "src/context/socketContext";
import { bookedUsers, fetchMessages, sendMessage } from "src/services/doctor/doctorapi";
import { deleteMessage, uploadToCloudinary } from "src/services/user/userApi";
import { useRef } from "react";
import { FaVideo } from "react-icons/fa";
import { setVideoCall } from "src/Redux/Slice/doctorSlice";
import { UseDispatch } from "react-redux";
import { useDispatch } from "react-redux";

interface Contact {
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

export default function DoctorChatNew() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>("")
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
    const [fullPreviewImage, setFullPreviewImage] = useState<string | null>(null);
    const [doctorData, setDoctorData] = useState<any>(null)
    const [userData, setUserData] = useState<any>(null)

    const { createSocket, socket } = useSocket()

    const chatAreaRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                chatAreaRef.current &&
                !chatAreaRef.current.contains(event.target as Node)
            ) {
                setSelectedMessageId(null); // Clear selected message
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

        // Cleanup the listener on unmount
        return () => {
            socket.off("sendMessage", handleIncomingMessage);
        };
    }, [socket]);


    useEffect(() => {
        const doctorInfo = localStorage.getItem('doctorInfo');
        const userInfo = localStorage.getItem('userInfo')

        if (doctorInfo) {
            const parsedDoctor = JSON.parse(doctorInfo);
            setDoctorId(parsedDoctor._id);
            setDoctorData(parsedDoctor)
        }
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo)
            setUserData(parsedUser)
        }
    }, []);

    useEffect(() => {
        async function getBookedUsers() {
            try {
                const userData = await bookedUsers();
                setContacts(userData as Contact[]);


            } catch (error) {
                console.error("Error fetching booked users:", error);
            }
        }
        getBookedUsers();
    }, []);

    useEffect(() => {
        async function loadMessages() {

            if (selectedContact) {
                try {
                    const msgs = await fetchMessages(selectedContact._id, doctorId as string);


                    setMessages(msgs as Message[]);
                    // console.log("This is messages",messages);


                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        }
        loadMessages();
    }, [selectedContact, doctorId]);

    const handleSendMessage = async () => {

        if (!selectedContact || !doctorId) return;
        // console.log("Sending message:", {
        //     message: newMessage,
        //     senderId: doctorId,
        //     receiverId: selectedContact._id,
        //     image: imageUrl
        // });

        try {
            const msg = await sendMessage({
                senderId: doctorId,
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
        if (!file || !selectedContact || !doctorId) return;
        const localUrl = URL.createObjectURL(file);
        setImagePreview(localUrl);
        const formData = new FormData();
        formData.append("file", file);
        // const fileUrl: any = await uploadToCloudinary(formData)

        // setImageUrl(fileUrl)
        try {
            setUploading(true); // show loader / disable send
            const fileUrl: any = await uploadToCloudinary(formData);
            setImageUrl(fileUrl);
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false); // re-enable send
        }

    };
    const handleDeleteMessage = async (messageId: string) => {
        try {
            console.log("messageId", messageId);
            const updateData = await deleteMessage(messageId)
            // await deleteMessageAPI(messageId);
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


    const navigateVideoChat = () => {


        // if (!selectedContact || !userData || !doctorData) return;

        // Find the booking data for the selected contact
        const contactBooking = contacts.find((contact) => contact._id === selectedContact?._id);
        const bookingId: any = contactBooking?.bookingId || ""; // Use the contact's ID as bookingId
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
                bookingId: bookingId,
            })
        );
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
                <div className="p-4 font-bold text-lg border-b">Chats</div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map((contact) => (
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
                    ))}
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
                        <div className="ml-[627px]">
                            <button
                                className="flex justify-center gap-3 bg-teal-500 px-4 py-2 rounded-lg"
                                onClick={navigateVideoChat}
                            >
                                <h1 className="text-1xl text-white">Start Session</h1>
                                <FaVideo className="h-6 w-6" />
                            </button>
                        </div>
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
                        {/* {messages.length === 0 ? (
                            <div className="text-center text-gray-400">
                                No messages yet. Start the conversation!
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`flex ${msg.senderId.toString() === doctorId ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full max-w-xs">
                                        {msg.message}
                                    </div>
                                </div>
                            ))
                        )} */}
                        {messages
                            .filter((msg) => msg.message.trim() !== "" || msg.image) // Filter out empty messages with no image
                            .map((msg) => {
                                const time = new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
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
