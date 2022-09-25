/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50728
Source Host           : localhost:3306
Source Database       : jsplusplus

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2022-09-25 09:14:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for course_field
-- ----------------------------
DROP TABLE IF EXISTS `course_field`;
CREATE TABLE `course_field` (
  `id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `fieldName` varchar(20) DEFAULT NULL,
  `fieldType` smallint(5) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_field
-- ----------------------------
INSERT INTO `course_field` VALUES ('1', '前端高薪就业', '1');
INSERT INTO `course_field` VALUES ('2', '精品公益课', '2');
INSERT INTO `course_field` VALUES ('3', '精品小课12', '3');
INSERT INTO `course_field` VALUES ('4', '全休班体验课', '4');
INSERT INTO `course_field` VALUES ('5', 'webpack打包课程', '5');
INSERT INTO `course_field` VALUES ('13', 'next服务端渲染', '12');
INSERT INTO `course_field` VALUES ('14', '分类测试11', '13');

-- ----------------------------
-- Table structure for course_field_list
-- ----------------------------
DROP TABLE IF EXISTS `course_field_list`;
CREATE TABLE `course_field_list` (
  `id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `fieldType` smallint(5) DEFAULT '0',
  `description` mediumtext NOT NULL,
  `thumb` varchar(200) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `studying` smallint(5) DEFAULT '0',
  `content` longtext NOT NULL,
  `author` varchar(20) NOT NULL DEFAULT '',
  `createtime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_field_list
-- ----------------------------
INSERT INTO `course_field_list` VALUES ('1', 'WEB前端开发高级工程师『快速就业助力计划』【JS++前端】', '1', '', 'http://tximg.jsplusplus.com/zwmTBpSrxjoAgRDhOrL2E.jpg', '3388.00', '0', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('2', 'WEB前端高级工程师养成计划『全修精英特训』【JS++】', '1', '', 'http://tximg.jsplusplus.com/Qcy-cP_NfnuQSWZ3fEAOh.jpg', '9988.00', '86', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('3', ' WEB前端高级工程师养成计划『提升计划-第3期』【JS++】', '1', '', 'http://tximg.jsplusplus.com/lrYzQvKZLcXMmiBZ6Cheh.jpg', '7580.00', '13', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('4', 'WEB前端高级工程师养成计划『就业计划-第4期』【JS++】', '1', '', 'http://tximg.jsplusplus.com/zwmTBpSrxjoAgRDhOrL2E.jpg', '6180.00', '60', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('5', '不止于就业前端技术|JavaScript底层核心|组件化开发|JS|Vue|Node', '2', '', 'http://tximg.jsplusplus.com/hKA-X-jcjSugmjPOYfUdw.jpg', '0.00', '941', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('6', '【2020全新JS++前端】『JavaScript业务能力提升班』', '2', '', 'http://tximg.jsplusplus.com/QB2ZwTAfmxkOF2gmeK19p.jpg', '0.00', '82', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('7', 'WEB大前端开发架构师养成计划『全栈架构特训』【JS++】', '2', '', 'http://tximg.jsplusplus.com/zwmTBpSrxjoAgRDhOrL2E.jpg', '10688.00', '3', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('8', 'JS++小野老师带你玩转『前端JavaScript模块化』', '3', '', 'http://tximg.jsplusplus.com/TSAE9FUv7Up7a4bFwSNBY.jpg', '119.00', '71', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('9', 'Vue『前端课堂』WEB APP - Vue-router|Vuex【10元拿好课】', '3', '', 'http://tximg.jsplusplus.com/w4zEz7jlJ3HQEP7xlZTYv.jpg', '299.00', '41', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('10', '10小时搞定移动端『新闻头条』【纯正阿里系组件化开发】', '3', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '169.00', '8713', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('11', 'VueJS项目架构与组件化设计|组件抽象|全实战项目|【一线生活通】', '3', '', 'http://tximg.jsplusplus.com/ALrQaIA3wquB-YKg8KOQN.jpg', '498.00', '6', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('12', '小野老师-JS组件化『小米手机官网升级版』', '3', '', 'http://tximg.jsplusplus.com/ALrQaIA3wquB-YKg8KOQN.jpg', '498.00', '6', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('13', 'WEB前端开发系列项目实战『直播教室』【JS++前端】', '4', '', 'http://tximg.jsplusplus.com/BocDkboW0LsQDXSOGNVQQ.jpg', '0.00', '35', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('14', '高级前端Vip就业班试学课【JS++】', '4', '', 'http://tximg.jsplusplus.com/ekTdOeqvQjQHw5-XYWkeo.jpg', '299.00', '54', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('21', '水电费感受到', '1', '', 'http://tximg.jsplusplus.com/ekTdOeqvQjQHw5-XYWkeo.jpg', '234.00', '33', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('22', '新增课程测试阿斯顿发发生发阿萨德法师法发顺丰', '3', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '3333.00', '456', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('29', 'vite打包课程实战0314', '2', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '1200.00', '63', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('24', 'Vue全栈相关(react+redux)实战课程阿士大夫撒', '4', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '0.00', '10000', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('25', 'javascript实战体系课程之模块化开发', '3', '', 'http://tximg.jsplusplus.com/ekTdOeqvQjQHw5-XYWkeo.jpg', '2342.00', '58', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('27', 'PS基础课程', '4', '', 'http://tximg.jsplusplus.com/ekTdOeqvQjQHw5-XYWkeo.jpg', '0.00', '20', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('34', 'webpack打包课程测试,代码分割,代码压缩,性能优化', '5', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '0.00', '123', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('35', '阿士大夫撒发', '1', '', 'http://tximg.jsplusplus.com/ekTdOeqvQjQHw5-XYWkeo.jpg', '2223.00', '33', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('36', '阿士大夫撒发是111', '12', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '222.00', '33', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('39', '删除分类测试功能实现成功', '13', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '222.00', '3333', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('38', '阿斯顿发顺丰三分', '12', '', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '1122.00', '345', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('40', 'koa-multer图片上传测试', '13', '', 'http://localhost:3001/uploads/1654912748392.png', '111.00', '222', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('41', 'webpack打包测试', '5', '', 'http://localhost:3001/uploads/1654913300835.png', '333.00', '444', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('43', '士大夫撒发送111', '12', '', 'http://localhost:3001/uploads/1654914279884.png', '333.00', '444', '', '', '1662976829831');
INSERT INTO `course_field_list` VALUES ('47', 'koa+nodejs+mysql全栈课程学习,腾讯课堂在线学习', '2', 'koa+nodejs+mysql全栈课程学习', 'http://localhost:3001/uploads/1662974274708.png', '0.00', '222', '<p style=\"text-align: start;\"><span style=\"color: rgb(255, 77, 79);\"><strong>汽车芯片持续结构性短缺</strong></span></p><p style=\"text-align: start;\">自2020年疫情暴发以来，芯片供应链屡受冲击，加上“新四化”时代汽车对芯片需求的大幅增加，“缺芯”已经成为全球汽车行业的常态，也成为了制约汽车产业发展的重要原因之一。</p><ul><li style=\"text-align: start;\">“在很长一段历史内都没有看到这么大规模‘缺芯’的状况。”王升杨这样形容疫情后的“缺芯”问题。他表示，这主要是源于三方面的因素，首先是芯片产业链在过去两年内经历了从12寸晶圆到8寸晶圆工艺切换的过程，在此过程中出现了结构性缺货；其次，不确定的地缘冲突以及反复的疫情都对芯片行业带来了冲击；最后且最重要是的一点是新能源行业这两年内迅猛增长的需求，超出所有人此前的预测。</li><li style=\"text-align: start;\">在电动化和智能化趋势下，汽车对芯片的需求量大幅增加。电动汽车的芯片需求是传统燃油车时代的约两倍，而未来更高阶自动驾驶汽车的新增芯片需求量则可能是传统非智能汽车的8~10倍。</li><li style=\"text-align: start;\">去年的“缺芯”是全面的缺，所有的品类、供应链环节都缺，王升杨指出，今年以来，“缺芯”现象出现了结构性分化，像消费电子、工业通信等的一些领域里已经基本不缺，整个行业增长趋平，现在比较缺的是高压BCD和功率器件，这部分短缺的主要原因是汽车和新能源行业的快速增长。</li></ul>', 'admin', '1662976829831');
INSERT INTO `course_field_list` VALUES ('48', '阿斯顿发顺丰', '2', '阿士大夫撒发的', 'http://tximg.jsplusplus.com/XOW3qUQsbN7TzoeVDuMHR.jpg', '22.00', '33', '<p>阿斯顿发顺丰三分</p>', 'admin', '1662976829831');
