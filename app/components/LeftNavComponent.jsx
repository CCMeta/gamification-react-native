import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import { Menu, Icon, Switch, Tag } from 'antd';
const SubMenu = Menu.SubMenu;

const LeftNavComponent = React.createClass({
    render () {
        return (
            <Menu
                style={{width:"auto"}}
                defaultOpenKeys={[]}
                selectedKeys={[this.props.current.navType.toString()]}
                mode="inline">
                <Menu.Item key="0">
                    <Link to="/inbox"><p><Icon type="inbox" />收集箱
                    <LeftNavComponentLengthSpan navKey="0" quests={this.props.quests}/></p></Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="/today"><p><Icon type="play-circle-o" />今日待办
                        <LeftNavComponentLengthSpan navKey="1" quests={this.props.quests}/></p></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/next"><p><Icon type="star-o" />下一步行动
                        <LeftNavComponentLengthSpan navKey="2" quests={this.props.quests}/></p></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/waiting"><p><Icon type="pause-circle-o" />等待中
                        <LeftNavComponentLengthSpan navKey="3" quests={this.props.quests}/></p></Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/schedule"><p><Icon type="calendar" />日程表
                        <LeftNavComponentLengthSpan navKey="4" schedules={this.props.schedules}/></p></Link>
                </Menu.Item>
                <Menu.Item disabled={true}/>
                <Menu.Item key="5">
                    <Link to="/done"><p><Icon type="check-circle-o" />已完成
                        <LeftNavComponentLengthSpan navKey="5" quests={this.props.quests}/></p></Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to="/trash"><p><Icon type="delete" />回收箱
                        <LeftNavComponentLengthSpan navKey="6" quests={this.props.quests}/></p></Link>
                </Menu.Item>
                    <Menu.Item disabled={true}/>

                <Menu.Item key="7">
                  <Link to="/tree"><p><Icon type="bars" />任务树
                      </p></Link>
                </Menu.Item>
                    <Menu.Item disabled={true}/>

                <Menu.Item key="9">
                    <Link to="/shop"><p><Icon type="smile" />奖励池
                        </p></Link>
                </Menu.Item>
                <Menu.Item key="10"><Icon type="shopping-cart" />道具池</Menu.Item>
                <Menu.Item key="11">
                    <Link to="/chart"><p><Icon type="bar-chart" />数据统计
                        </p></Link>
                </Menu.Item>
            </Menu>
        )
    }
})

const LeftNavComponentLengthSpan = React.createClass({
    handleLength (key) {
        let navCount;
        switch (parseInt(key)) {
            case 4:
                navCount = this.props.schedules.filter((schedule) => {
                    if(schedule.state === 0){
                        return schedule
                    }
                });;
                break;
            case 5:
                navCount = this.props.quests.filter((quest) => {
                    if(quest.state === 1){
                        return quest
                    }
                });
                break;
            default:
                navCount = this.props.quests.filter((quest) => {
                    if(quest.type === parseInt(key) && quest.state === 0){
                        return quest
                    }
                });
        }
        return navCount.length;
    },
    render () {
        return (
            <span style={{float:"right"}}>{this.handleLength(this.props.navKey)}</span>
        )
    }
})


function mapStateToProps(state) {
  return {
      quests: state.quests,
      schedules: state.schedules,
      current: state.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //onFlashData: () => dispatch(actions.fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavComponent)
