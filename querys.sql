SELECT up.id, up.nickname, up.picture 
FROM user_profiles AS up 
WHERE up.nickname like ?;

SELECT up.id, up.nickname, up.picture
FROM user_profiles AS up
LEFT JOIN friends AS f ON up.user_id = f.user2_id AND f.user1_id = '111806e0-c6a6-47bf-b293-8081a9b39c8e'
WHERE up.nickname LIKE 'm%'
AND f.id IS NULL;


SELECT f.id, up.nickname, up.picture
FROM user_profiles AS up 
INNER JOIN friends AS f 
ON up.user_id = f.user2_id
WHERE f.user1_id = '111806e0-c6a6-47bf-b293-8081a9b39c8e';