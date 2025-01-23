-- Insert Sample Data for Users
INSERT INTO users (username, email, password) VALUES
('heroUser1', 'user1@example.com', 'hashedpassword1'),  -- Ensure these are hashed passwords
('heroUser2', 'user2@example.com', 'hashedpassword2');  -- Ensure these are hashed passwords

-- Insert Sample Data for Quests (assuming 'user_id' is a foreign key referencing 'users')
INSERT INTO quests (user_id, quest_name, description) VALUES
(1, 'Morning Exercise', 'Complete 20-minute morning workout'),
(1, 'Reading Habit', 'Read 15 pages of a book every day');

-- Insert Sample Data for Habits (assuming 'user_id' is a foreign key referencing 'users')
INSERT INTO habits (user_id, habit_name, description, frequency) VALUES
(1, 'Drink Water', 'Drink 8 glasses of water daily', 'Daily'),
(2, 'Meditation', 'Practice 10 minutes of meditation', 'Daily');
