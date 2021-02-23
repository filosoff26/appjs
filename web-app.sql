USE  `nodejs_app`;
CREATE TABLE `todos` (
    `id_todo` int PRIMARY KEY AUTO_INCREMENT,
    `title` varchar(50),
    `todo` text,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);