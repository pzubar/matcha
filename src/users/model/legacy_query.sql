SELECT DISTINCT ON (userId) sub.*, users.username, users.id
FROM (
         SELECT 'out' AS type, id, receiver_id AS userId, message, created_at
         FROM messages
         WHERE sender_id = :userId

         UNION ALL
         SELECT 'in' AS type, id, sender_id AS userId, message, created_at
         FROM messages
         WHERE receiver_id = :userId
     ) sub
         JOIN users on users.id = userId
ORDER BY userId, sub.created_at DESC
