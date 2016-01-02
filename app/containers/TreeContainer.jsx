import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import d3 from 'd3'
import { Row, Col, Tabs, Icon, Button, Menu, DropdownButton, Collapse, Tag, Popconfirm, message  } from 'antd';


            let data = {"code":200,"data":[{"id":1,"text":"我是爷爷2","note":"爷爷","exp":100,"gold":60,"state":0,"type":3,"deadline_at":null,"done_at":null,"alert_at":"2015-10-24 15:45:16","class_id":2,"father_id":0,"schedule_id":0},{"id":2,"text":"我是爸爸1","note":"爸爸","exp":80,"gold":80,"state":1,"type":1,"deadline_at":"2015-10-24","done_at":"2015-12-30","alert_at":"2015-10-24 15:45:41","class_id":0,"father_id":1,"schedule_id":0},{"id":3,"text":"我是儿子1","note":"儿子","exp":100,"gold":100,"state":0,"type":3,"deadline_at":"2015-10-24","done_at":null,"alert_at":"2015-10-24 15:46:01","class_id":0,"father_id":2,"schedule_id":0},{"id":4,"text":"我是儿子2","note":"儿子","exp":70,"gold":70,"state":1,"type":1,"deadline_at":null,"done_at":"2015-12-30","alert_at":"2015-10-24 17:47:42","class_id":0,"father_id":2,"schedule_id":0},{"id":7,"text":"我是爸爸3","note":"爸爸","exp":50,"gold":100,"state":1,"type":1,"deadline_at":"2015-12-22","done_at":"2015-12-30","alert_at":"2015-10-24 15:45:41","class_id":0,"father_id":10,"schedule_id":0},{"id":6,"text":"我是爸爸2","note":"爸爸","exp":70,"gold":100,"state":0,"type":0,"deadline_at":"2015-10-24","done_at":null,"alert_at":"2015-10-24 15:45:41","class_id":0,"father_id":10,"schedule_id":0},{"id":8,"text":"我是儿子3","note":"儿子","exp":100,"gold":100,"state":0,"type":0,"deadline_at":"2015-10-24","done_at":null,"alert_at":"2015-10-24 15:46:01","class_id":0,"father_id":2,"schedule_id":0},{"id":9,"text":"我是儿子4","note":"儿子","exp":100,"gold":100,"state":0,"type":0,"deadline_at":"2015-10-24","done_at":null,"alert_at":"2015-10-24 17:47:42","class_id":0,"father_id":7,"schedule_id":0},{"id":10,"text":"我是爷爷1","note":"爷爷","exp":100,"gold":90,"state":0,"type":0,"deadline_at":"2015-10-24","done_at":null,"alert_at":"2015-10-24 15:45:16","class_id":2,"father_id":0,"schedule_id":0},{"id":11,"text":"我是孙子1","note":"孙子","exp":50,"gold":50,"state":1,"type":0,"deadline_at":"2015-10-24","done_at":"2015-12-23","alert_at":"2015-10-24 18:08:02","class_id":0,"father_id":3,"schedule_id":0},{"id":12,"text":"我是爷爷3","note":"爷爷","exp":100,"gold":50,"state":1,"type":0,"deadline_at":"2015-11-28","done_at":"2015-12-23","alert_at":"2015-11-28 14:49:27","class_id":2,"father_id":0,"schedule_id":0},{"id":13,"text":"我是爸爸4","note":"爸爸","exp":50,"gold":50,"state":1,"type":0,"deadline_at":"2015-11-28","done_at":"2015-12-21","alert_at":"2015-11-28 15:04:21","class_id":0,"father_id":12,"schedule_id":0},{"id":14,"text":"asd","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":15,"text":"hehe","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":16,"text":"haha","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":17,"text":"测试添加1","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":18,"text":"测试添加2","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":19,"text":"测试添加3","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":20,"text":"卧槽尼玛","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":21,"text":"我是\b收件箱添加测试1","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":22,"text":"我是\b收件箱添加测试2","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":23,"text":"我是今日待办添加测试1","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":24,"text":"我是今日待办添加测试2","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":25,"text":"我是下一步行动添加测试1","note":"","exp":0,"gold":0,"state":1,"type":2,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":26,"text":"我是等待中测试1","note":"","exp":0,"gold":0,"state":1,"type":3,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":27,"text":"我是下一步行动测试2","note":"","exp":0,"gold":0,"state":1,"type":2,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":28,"text":"傻逼老高","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":29,"text":"我是今日待办顺序测试","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":30,"text":"呵呵","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":31,"text":"测试验证","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":32,"text":"if i fuckyou","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":33,"text":"测试修改addquests","note":"","exp":0,"gold":0,"state":1,"type":0,"deadline_at":null,"done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":34,"text":"测试添加任务详情","note":"","exp":4,"gold":0,"state":1,"type":0,"deadline_at":"2015-11-30","done_at":null,"alert_at":"2015-11-30 17:15:00","class_id":0,"father_id":0,"schedule_id":0},{"id":35,"text":"测试添加任务详情 - 今日待办","note":"","exp":8,"gold":2,"state":1,"type":1,"deadline_at":"2015-11-30","done_at":"2015-12-22","alert_at":"2015-11-30 17:15:00","class_id":0,"father_id":0,"schedule_id":0},{"id":36,"text":"嘿 卖萧的","note":"呵呵","exp":3,"gold":3,"state":1,"type":1,"deadline_at":null,"done_at":"2015-12-22","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":37,"text":"测试编辑任务","note":"note","exp":7,"gold":9,"state":1,"type":1,"deadline_at":"2015-11-15","done_at":"2015-12-21","alert_at":"2015-11-24 13:30:00","class_id":0,"father_id":0,"schedule_id":0},{"id":38,"text":"老高是傻逼吗 是的","note":"s","exp":4,"gold":5,"state":1,"type":1,"deadline_at":null,"done_at":"2015-12-22","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":39,"text":"我要钱！ 好多钱！！！","note":"","exp":9,"gold":9,"state":1,"type":1,"deadline_at":null,"done_at":"2015-12-22","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":40,"text":"我是服务器上测试今日待办1","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":null,"done_at":"2015-12-21","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":41,"text":"测试日程1","note":"测试日程1","exp":100,"gold":0,"state":0,"type":0,"deadline_at":"2015-12-13","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":1},{"id":42,"text":"测试日程1","note":"测试日程1","exp":100,"gold":0,"state":0,"type":0,"deadline_at":"2015-12-18","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":1},{"id":43,"text":"测试日程1","note":"测试日程1","exp":100,"gold":0,"state":0,"type":0,"deadline_at":"2015-12-18","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":1},{"id":44,"text":"我是测试日期1","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":"2015-12-18","done_at":"2015-12-21","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":45,"text":"我是瞎比","note":"","exp":0,"gold":0,"state":1,"type":1,"deadline_at":"2015-12-18","done_at":"2015-12-21","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":46,"text":"今日待办快速添加测试","note":"","exp":40,"gold":0,"state":0,"type":1,"deadline_at":"2015-12-19","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":47,"text":"今日待办快速添加测试","note":"","exp":0,"gold":0,"state":0,"type":1,"deadline_at":"2015-12-19","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":48,"text":"今日待办快速添加测试","note":"","exp":0,"gold":0,"state":0,"type":1,"deadline_at":"2015-12-19","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":49,"text":"今日待办快速添加测试","note":"","exp":40,"gold":50,"state":1,"type":2,"deadline_at":null,"done_at":"2015-12-30","alert_at":null,"class_id":0,"father_id":0,"schedule_id":0},{"id":50,"text":"hehe","note":"hahah","exp":0,"gold":40,"state":0,"type":1,"deadline_at":"2015-12-20","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":5},{"id":51,"text":"大傻逼","note":"大傻逼2","exp":40,"gold":40,"state":1,"type":1,"deadline_at":"2015-12-20","done_at":"2015-12-30","alert_at":null,"class_id":0,"father_id":0,"schedule_id":7},{"id":53,"text":"我是测试日程爹2","note":"我是测试日程爹2","exp":60,"gold":40,"state":0,"type":1,"deadline_at":"2015-12-30","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":3},{"id":52,"text":"测试日程1","note":"测试日程1","exp":100,"gold":0,"state":1,"type":1,"deadline_at":"2015-12-30","done_at":"2015-12-30","alert_at":null,"class_id":0,"father_id":0,"schedule_id":1},{"id":54,"text":"傻逼老高","note":"我是测试日程添加重复类型单次1","exp":70,"gold":80,"state":1,"type":1,"deadline_at":"2015-12-30","done_at":"2015-12-30","alert_at":null,"class_id":0,"father_id":0,"schedule_id":4},{"id":55,"text":"测试日程1","note":"测试日程1","exp":100,"gold":0,"state":0,"type":1,"deadline_at":"2015-12-31","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":1},{"id":56,"text":"我是来测试的","note":"哈哈哈","exp":50,"gold":10,"state":0,"type":1,"deadline_at":"2015-12-31","done_at":null,"alert_at":null,"class_id":0,"father_id":0,"schedule_id":8}],"message":""};


var w = 1280 - 80,
    h = 800 - 180,
    x = d3.scale.linear().range([0, w]),
    y = d3.scale.linear().range([0, h]),
    color = d3.scale.category20c();
var treemap = d3.layout.treemap()
    .round(false)
    .size([w, h])
    .sticky(true)
    .value(function(d) { return d.size; });

var svg = d3.select("#body")
    .attr("class", "chart")
    .style("width", w + "px")
    .style("height", h + "px")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(.5,.5)");

function renderMap(root) {
  svg.selectAll('g').remove();
  var nodes;
  if (root.children) {
    nodes = treemap.nodes(root).filter(d => d.parent == root || (d.parent == root && !d.children));
  } else {
    nodes = [root];
  }
  var cell = svg.selectAll('g')
  .data(nodes)
  .enter()
  .append('svg:g')
  .attr('class', 'cell')
  .attr('transform', d => `translate(${d.x}, ${d.y})`)
  .on('click', d => d3.event.button === 0 && zoom(d))
  .on('contextmenu', d => { d3.event.preventDefault(); zoom(root.parent ? root.parent : root);} );
  cell.append('svg:rect')
  .attr('width', d => d.dx - 1)
  .attr('height', d => d.dy - 1)
  .style('fill', d => color(d.name))
  cell.append('svg:text')
  .attr('x', d => d.dx / 2)
  .attr('y', d => d.dy / 2)
  .attr('dy', '.35em')
  .attr('text-anchor', 'middle')
  .text(d => d.name)
  .style('opacity', function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });
}

function zoom(d) {
    var kx = w / d.dx, ky = h / d.dy;
    x.domain([d.x, d.x + d.dx]);
    y.domain([d.y, d.y + d.dy]);
    renderMap(d);
    var t = svg.selectAll("g.cell")
        // .transition()
        // .duration(750)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
    t.select("rect")
        .attr("width", function(d) { return kx * d.dx - 1; })
        .attr("height", function(d) { return ky * d.dy - 1; })

    t.select("text")
        .attr("x", function(d) { return kx * d.dx / 2; })
        .attr("y", function(d) { return ky * d.dy / 2; })
        .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });
}

function size(d) {
    return d.size;
}

function count(d) {
    return 1;
}

function arrayToTreeMap(menus) {
    var id = 0,level = 0;
    var menu_objects = [],tree = [],not_root_menu = [];
    for (var menu of menus) {
        var menu_object = {
            name: menu['text'],
            menu: menu,
            children: []
        }
        var id = menu['id'];
        var level = menu['father_id'];
        menu_objects[id] = menu_object;
        if (level) {
            not_root_menu.push(menu_object);
        } else {
            tree.push(menu_object);
        }

    }
    for (var menu_object of not_root_menu) {
        var menu = menu_object['menu'];
        var id = menu['id'];
        var level = menu['father_id'];
        menu_object['size'] = 100;
        if (typeof menu_objects['size'] != 'undefined') {
            delete(menu_objects['size']);
        }
        menu_objects[level]['children'].push(menu_object);
    }
    var treeMap = {name: "Root", children: tree};
    return treeMap;
}

const TreeContainer = React.createClass({
    render () {
      console.log(svg);

        return (
          <div>
            <Row type="flex" justify="center">
              <Col span="23">
                <div id="body" style={{overflow:"hidden"}}>{renderMap(arrayToTreeMap(data['data']))}</div>
              </Col>
            </Row>
          </div>
        )
    }
})

export default TreeContainer
