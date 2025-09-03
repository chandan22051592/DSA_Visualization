

function Hero(){
    return (
        <div>
            <section className="flex flex-col items-center justify-center h-[90vh] text-center px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                    Transform Your DSA Learning
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 bg-clip-text text-transparent">
                        Through Visualization
                    </span>
                </h1>
                <p className="text-gray-400 max-w-2xl mb-8">
                    Experience a transformative approach to DSA learning through immersive
                    visualizations, simplifying intricate concepts for deeper comprehension
                    and mastery.
                </p>

                <div className="flex space-x-6">
                    <a
                        href={import.meta.env.VITE_GITHUB_LINK || "#"}
                        target="_blank"

                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg transition transform hover:scale-105"
                    >
                        GitHub Code
                    </a>
                    <a
                        href={import.meta.env.VITE_LINKEDIN_LINK || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg transition transform hover:scale-105"
                    >   
                        Creator
                    </a>
                </div>
            </section>
            {/* <!-- Why Learn DSA Section --> */}
            <section class="why-dsa bg-gray-900 text-white pt-0 px-6">
                {/* <!-- Gradient Line --> */}
                <div class="w-11/12 h-[2px] mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8"></div>

                <h2 class="text-center text-3xl font-bold mb-10">
                    Why Learn <span class="text-pink-400">DSA?</span>
                </h2>

                <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <div class="p-6 bg-gray-800 rounded-xl shadow-md">
                        <h3 class="font-semibold text-lg mb-2">Problem-Solving Skills</h3>
                        <p>Develop critical thinking and problem-solving abilities by mastering data structures and algorithms.</p>
                    </div>

                    <div class="p-6 bg-gray-800 rounded-xl shadow-md">
                        <h3 class="font-semibold text-lg mb-2">Coding Efficiency</h3>
                        <p>Write efficient and optimized code for better performance and scalability.</p>
                    </div>

                    <div class="p-6 bg-gray-800 rounded-xl shadow-md">
                        <h3 class="font-semibold text-lg mb-2">Technical Interviews</h3>
                        <p>Better prepare for software engineering interviews with DSA knowledge.</p>
                    </div>

                    <div class="p-6 bg-gray-800 rounded-xl shadow-md">
                        <h3 class="font-semibold text-lg mb-2">Strong Foundation</h3>
                        <p>Master fundamental principles essential for a successful career in computer science.</p>
                    </div>

                    <div class="p-6 bg-gray-800 rounded-xl shadow-md">
                        <h3 class="font-semibold text-lg mb-2">Software Design Skills</h3>
                        <p>Design elegant and scalable software solutions using DSA principles.</p>
                    </div>

                    <div class="p-6 bg-gray-800 rounded-xl shadow-md">
                        <h3 class="font-semibold text-lg mb-2">Team Collaboration</h3>
                        <p>Collaborate effectively with team members on complex projects.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;