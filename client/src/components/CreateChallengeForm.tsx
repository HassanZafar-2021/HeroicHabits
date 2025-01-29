import * as React from "react";
import { useState } from "react";

interface ChallengeFormProps {
    onSubmit: (formData: {
        group: string;
        name: string;
        shortName: string;
        prize: number;
        privacy: string;
    }) => void;
}

const CreateChallengeForm: React.FC<ChallengeFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        group: "",
        name: "",
        shortName: "",
        prize: 0,
        privacy: "public",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "prize" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.group || !formData.name || !formData.shortName) {
            alert("Please fill in all required fields.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <input
                name="group"
                placeholder="Group ID"
                value={formData.group}
                onChange={handleChange}
                className="p-2 border rounded"
                required
            />
            <input
                name="name"
                placeholder="Challenge Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded"
                required
            />
            <input
                name="shortName"
                placeholder="Short Name"
                value={formData.shortName}
                onChange={handleChange}
                className="p-2 border rounded"
                required
            />
            <input
                name="prize"
                type="number"
                placeholder="Prize"
                value={formData.prize}
                onChange={handleChange}
                className="p-2 border rounded"
                min="0"
            />
            <label htmlFor="privacy" className="sr-only">Privacy</label>
            <select
                id="privacy"
                name="privacy"
                value={formData.privacy}
                onChange={handleChange}
                className="p-2 border rounded"
            >
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Create Challenge
            </button>
        </form>
    );
};

export default CreateChallengeForm;
