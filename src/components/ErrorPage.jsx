import Header from "./Header";
import Footer from "./Footer";

function ErrorPage() {
    return (
        <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col">
            <div>
            <section className="flex flex-col items-center justify-center h-[90vh] text-center px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                    This Page is in Progress
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 bg-clip-text text-transparent">
                        Please go back to home
                    </span>
                </h1>
            </section>
        </div>
        </div>
    );
}

export default ErrorPage;
