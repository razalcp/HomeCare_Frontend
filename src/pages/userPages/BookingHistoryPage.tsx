import BookingHistory from "@components/UserComponents/BookingHistory";
import Footer from "@components/UserComponents/Footer";
import Header from "@components/UserComponents/Header";

const BookingHistoryPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
            <Header/>
          <BookingHistory />
        </main>
        <Footer />
      </div>
    )
}

export default BookingHistoryPage