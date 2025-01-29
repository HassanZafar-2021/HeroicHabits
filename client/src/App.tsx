import Header from "./components/Header";
import Hero from "./components/Hero";
import Quests from "./components/Quest";
import QuickActions from "./components/QuickAction";
import Footer from "./components/Footer";
import CreateChallengeForm from "./components/CreateChallengeForm";
import HabiticaClient from "../../Habitica/src/HabiticaClient";
import "./App.css"; // Import global styles

const App: React.FC = () => {
    const userId = "YOUR_USER_ID"; // Replace with your actual Habitica user ID
    const apiToken = "YOUR_API_TOKEN"; // Replace with your actual Habitica API token
    const habitica = new HabiticaClient(userId, apiToken);

    // Function to handle challenge creation
    const createChallengeHandler = async (challengeData: {
        group: string;
        name: string;
        shortName: string;
        prize: number;
        privacy: string;
    }) => {
        try {
            const response = await habitica.createChallenge(
                challengeData.group,
                challengeData.name,
                challengeData.shortName,
                "Summary of the challenge",
                "Description of the challenge",
                challengeData.prize,
                false
            );
            console.log("Challenge created:", response);
        } catch (error) {
            console.error("Error creating challenge:", error);
        }
    };

    return (
        <div className="bg-gradient-to-b from-yellow-50 to-blue-50 min-h-screen text-base-content">
            <Header userName="YourUserName" avatarUrl="YourAvatarUrl" />
            <main>
                <Hero />
                <Quests />
                <QuickActions />
                <CreateChallengeForm onSubmit={createChallengeHandler} />
            </main>
            <Footer />
        </div>
    );
};

export default App;
