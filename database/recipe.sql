/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50720 (5.7.20)
 Source Host           : localhost:3306
 Source Schema         : recipe

 Target Server Type    : MySQL
 Target Server Version : 50720 (5.7.20)
 File Encoding         : 65001

 Date: 03/09/2026 10:09:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ingredient
-- ----------------------------
DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE `ingredient` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '食材名',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for recipe
-- ----------------------------
DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '菜名',
  `calories_per_100g` decimal(6,2) DEFAULT '0.00' COMMENT '100g多少大卡',
  `difficulty` tinyint(4) DEFAULT '1' COMMENT '难度 1简单 2中等 3困难',
  `cooking_time` smallint(5) unsigned NOT NULL COMMENT '耗时(分钟)',
  `cuisine_type` varchar(50) DEFAULT NULL COMMENT '菜系/分类',
  `kitchenware` varchar(100) DEFAULT NULL COMMENT '厨具',
  `flavor` varchar(50) DEFAULT NULL COMMENT '口味',
  `effectImg` varchar(255) DEFAULT NULL COMMENT '效果图片URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for recipe_ingredient
-- ----------------------------
DROP TABLE IF EXISTS `recipe_ingredient`;
CREATE TABLE `recipe_ingredient` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `recipe_id` bigint(20) unsigned NOT NULL COMMENT '食谱ID',
  `ingredient_id` bigint(20) unsigned NOT NULL COMMENT '食材ID',
  `quantity` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用量（如：500克、2根）',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注（如：需提前泡发）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_recipe_ingredient` (`recipe_id`,`ingredient_id`) COMMENT '联合唯一键，防止重复关联',
  KEY `idx_ingredient_id` (`ingredient_id`),
  CONSTRAINT `fk_ri_ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ri_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食谱与食材关联表';

-- ----------------------------
-- Table structure for recipe_seasoning
-- ----------------------------
DROP TABLE IF EXISTS `recipe_seasoning`;
CREATE TABLE `recipe_seasoning` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `recipe_id` bigint(20) unsigned NOT NULL COMMENT '食谱ID',
  `seasoning_id` bigint(20) unsigned NOT NULL COMMENT '调料ID',
  `quantity` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用量（如：10克、1勺）',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注（如：分两次放入）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_recipe_seasoning` (`recipe_id`,`seasoning_id`) COMMENT '联合唯一键',
  KEY `idx_seasoning_id` (`seasoning_id`),
  CONSTRAINT `fk_rs_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rs_seasoning` FOREIGN KEY (`seasoning_id`) REFERENCES `seasoning` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食谱与调料关联表';

-- ----------------------------
-- Table structure for recipe_step
-- ----------------------------
DROP TABLE IF EXISTS `recipe_step`;
CREATE TABLE `recipe_step` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `recipe_id` bigint(20) unsigned NOT NULL COMMENT '食谱_id',
  `step_order` smallint(5) unsigned NOT NULL COMMENT '步骤序号',
  `content` text NOT NULL COMMENT '内容',
  `time_estimate` smallint(5) unsigned DEFAULT NULL COMMENT '时间(分钟)',
  `precautions` varchar(255) DEFAULT NULL COMMENT '注意事项',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `stepImg` varchar(255) DEFAULT NULL COMMENT '步骤图片URL',
  PRIMARY KEY (`id`),
  KEY `idx_recipe_id` (`recipe_id`),
  CONSTRAINT `fk_step_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for recipe_supplementary
-- ----------------------------
DROP TABLE IF EXISTS `recipe_supplementary`;
CREATE TABLE `recipe_supplementary` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `recipe_id` bigint(20) unsigned NOT NULL COMMENT '食谱ID',
  `supplementary_id` bigint(20) unsigned NOT NULL COMMENT '辅料ID',
  `quantity` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用量（如：少许、3克）',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注（如：出锅前撒入）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_recipe_supplementary` (`recipe_id`,`supplementary_id`) COMMENT '联合唯一键',
  KEY `idx_supplementary_id` (`supplementary_id`),
  CONSTRAINT `fk_rsup_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rsup_supplementary` FOREIGN KEY (`supplementary_id`) REFERENCES `supplementary` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食谱与辅料关联表';

-- ----------------------------
-- Table structure for seasoning
-- ----------------------------
DROP TABLE IF EXISTS `seasoning`;
CREATE TABLE `seasoning` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '调料名',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`) COMMENT '调料名唯一，防止重复录入'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='调料字典表';

-- ----------------------------
-- Table structure for supplementary
-- ----------------------------
DROP TABLE IF EXISTS `supplementary`;
CREATE TABLE `supplementary` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '辅料名',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`) COMMENT '辅料名唯一'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='辅料字典表';

SET FOREIGN_KEY_CHECKS = 1;
