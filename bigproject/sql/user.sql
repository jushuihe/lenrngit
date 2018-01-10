set names utf8;
drop database if exists miko;
create database miko charset=utf8;

/*进入数据库创建需要用的表*/
use miko;
create table miko_users(
	uid   INT primary key auto_increment,
	uname varchar(16),
	upwd  varchar(16),
	phone INT,
	email varchar(16),
	avatar varchar(64) DEFAULT "../img/default.png",
	user_name varchar(16),
	gender INT
);

create table miko_index_carousel(
	story_id   INT,         
	img        VARCHAR(64),
	title      VARCHAR(32),
	story_name VARCHAR(32)
);

CREATE TABLE story_list (
	story_id           INT PRIMARY KEY AUTO_INCREMENT,
	story_name         VARCHAR(32),
	story_autor        VARCHAR(32),
	story_readcount    BIGINT,				   /*阅读数*/
	story_introduction VARCHAR(128),           /*作用简介*/
	isRechangeable     INT,					   /*是否付费/*/
	addElite           INT,					   /*加精*/
	isGold             INT,					   /*金榜*/
	isSliver           INT,					   /*银榜*/
	isRecommend        INT,                    /*是否推荐*/
	updataTime         BIGINT,				   /*最近的更新时间*/
	totalWords         BIGINT,				   /*总字数*/
	collectorCount     INT,					   /*总收藏数*/
	ovationCount       INT					   /*总赞赏数*/
);

/*创建一个表表示小说的类型有哪些*/
create TABLE typeof_story(
	story_id           INT PRIMARY KEY AUTO_INCREMENT,
	story_name         VARCHAR(32),
	isRiqing           INT,
	isTongren          INT,
	isDianjin          INT,
	isMeishi           INT,
	isXiaoyuan         INT,
	isXinfan           INT,
	isLianai           INT,
	isLunli            INT,
	isWangyou          INT,
	isFighting         INT,
	isHarem            INT
);

/*为每个小说单独建一个表，用来记录每个小说的章数*/
CREATE TABLE story_content(
	story_id		INT,
	story_section	INT PRIMARY KEY AUTO_INCREMENT,
	section_title   VARCHAR(32),
	section_content VARCHAR(32),
	update_time     BIGINT,
	numberOfWords   BIGINT,
	isRechargeable  INT,
	pic             VARCHAR(32) DEFAULT  'img/default.png'
);

/*为每个小说的图片单独建一个表*/
CREATE TABLE story_pic(
	story_id  INT,
	sm        VARCHAR(64),
	md		  VARCHAR(64),
	lg        VARCHAR(64)
);