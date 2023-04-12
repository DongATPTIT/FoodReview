




CREATE DATABASE `blog_food`;
USE `blog_food`;

CREATE TABLE `user`(
	`id` INT(11) AUTO_INCREMENT,
	`username` VARCHAR(255)  UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT  NULL ,
	`name` 	 VARCHAR(255) DEFAULT NULL ,
	`email` 	 VARCHAR(255) DEFAULT NULL ,
	`phonenumber` VARCHAR(10) DEFAULT NULL ,	
	`address` VARCHAR(255) DEFAULT NULL ,
	`avartar` VARCHAR(500) DEFAULT NULL ,
	`dob`  DATE DEFAULT NULL,
	`sex` TINYINT(1) DEFAULT 1,
	`role` TINYINT(1) DEFAULT 0,
	`active` TINYINT(1) DEFAULT 0, 
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `permissions`(
	`id` INT(11) AUTO_INCREMENT,
	`name` 	 VARCHAR(255) NOT NULL ,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);

CREATE TABLE `user_permissions`(
	`id` INT(11) AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL,
	`permission_id` INT(11) NOT NULL,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `device_token`(
	`id` INT(11) AUTO_INCREMENT,
	`token_noti` VARCHAR(500) ,
	`user_id` INT(11) NOT NULL,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `category`(
	`id` INT(11) AUTO_INCREMENT,
	`name` VARCHAR(255) ,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `images`(
	`id` INT(11) AUTO_INCREMENT,
	`link` VARCHAR(255) ,
	`post_id` INT(11) NOT NULL,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `collections`(
	`id` INT(11) AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL,
	`post_id` INT(11) NOT NULL,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `posts`(
	`id` INT(11) AUTO_INCREMENT,
	`content` VARCHAR(255) ,
	`user_id` INT(11) NOT NULL,
	`category_id` INT(11) ,
	`active` TINYINT(1) DEFAULT 0, 
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `posts_detail`(
	`id` INT(11) AUTO_INCREMENT,
	`detail1` VARCHAR(255) ,
	`detail2` VARCHAR(255) ,
	`detail3` VARCHAR(255) ,
	`post_id` INT(11) NOT NULL,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `user_like_posts`(
	`id` INT(11) AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL ,
	`post_id` INT(11) NOT NULL ,
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);

CREATE TABLE `comments`(
	`id` INT(11) AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL ,
	`post_id` INT(11) NOT NULL ,
	`content` VARCHAR(500),
	`parent_id` INT (11),
	`child_number` INT(11),
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);
CREATE TABLE `notifications`(
	`id` INT(11) AUTO_INCREMENT,
	`user_id` INT(11) NOT NULL,
	`post_id` INT(11),
	`content` VARCHAR(500),
	`created_at` timestamp NULL DEFAULT current_timestamp(),
   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
   PRIMARY KEY(id)
);


ALTER TABLE `device_token`
	ADD CONSTRAINT FK_device_token FOREIGN KEY (`user_id`) REFERENCES `user`(id);
	
ALTER TABLE `posts`
	ADD CONSTRAINT FK_posts_category FOREIGN KEY (`category_id`) REFERENCES `category`(id);

ALTER TABLE `posts_detail`
	ADD CONSTRAINT FK_posts_detail FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
	
ALTER TABLE `images`
	ADD CONSTRAINT FK_posts_image FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
	
ALTER TABLE `user_permissions`
	ADD CONSTRAINT FK_users_permission FOREIGN KEY (`user_id`) REFERENCES `user`(id);
	
ALTER TABLE `user_permissions`
	ADD CONSTRAINT FK_permission_user_permissions FOREIGN KEY (`permission_id`) REFERENCES `permissions`(id);
	
ALTER TABLE `comments`
	ADD CONSTRAINT FK_user_comments FOREIGN KEY (`user_id`) REFERENCES `user`(id);
		
ALTER TABLE `comments`
	ADD CONSTRAINT FK_posts_comments FOREIGN KEY (`post_id`) REFERENCES `posts`(id);

ALTER TABLE `comments`
	ADD CONSTRAINT FK_parent_comments FOREIGN KEY (`parent_id`) REFERENCES `comments`(id);
	
ALTER TABLE `collections`
	ADD CONSTRAINT FK_posts_collections FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
	
ALTER TABLE `collections`
	ADD CONSTRAINT FK_user_collections FOREIGN KEY (`user_id`) REFERENCES `user`(id);

ALTER TABLE `user_like_posts`
	ADD CONSTRAINT FK_posts_like FOREIGN KEY (`post_id`) REFERENCES `posts`(id);
	
ALTER TABLE `user_like_posts`
	ADD CONSTRAINT FK_user_like FOREIGN KEY (`user_id`) REFERENCES `user`(id);

ALTER TABLE `notifications`
	ADD CONSTRAINT FK_user_notifi FOREIGN KEY (`user_id`) REFERENCES `user`(id);