import { useEffect, useState } from "react";

interface Challenge {
    _id: string;
    name: string;
}

interface ChallengeListProps {
    habiticaClient: {
        getChallenges: () => Promise<Challenge[]>;
    };
}

const ChallengeList: React.FC<ChallengeListProps> = ({ habiticaClient }) => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await habiticaClient.getChallenges();
                setChallenges(data);
            } catch (err) {
                setError("Failed to fetch challenges.");
                console.error("Error fetching challenges:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [habiticaClient]);

    if (loading) return <p>Loading challenges...</p>;
    if (error) return <p>{error}</p>;
    if (challenges.length === 0) return <p>No challenges available.</p>;

    return (
        <ul>
            {challenges.map((challenge) => (
                <li key={challenge._id}>{challenge.name}</li>
            ))}
        </ul>
    );
};

export default ChallengeList;
