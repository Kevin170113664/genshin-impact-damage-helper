import {Row, Col} from 'antd';
import './App.css';

function App() {
  function renderOneRow(title, value) {
    return (<Row className="stat-row">
      <Col span={12}>{title}</Col>
      <Col span={12} className='stat-value'>{value}</Col>
    </Row>)
  }

  return (
    <div className="app">
      <Row className="header">甘雨伤害计算小助手🐷</Row>
      <Row className="title base-stats">人物基础数值</Row>
      <div>
        {renderOneRow('人物等级', '90')}
        {renderOneRow('攻击力', '1000')}
        {renderOneRow('元素精通', '0')}
        {renderOneRow('暴击率', '5%')}
        {renderOneRow('暴击伤害', '50%')}
        {renderOneRow('冰元素伤害加成', '46.6%')}
        {renderOneRow('物理伤害加成', '0%')}
      </div>
      <Row className="title weapon-stats">武器基础数值</Row>
      <div>
        {renderOneRow('装备武器', '试做澹月')}
        {renderOneRow('武器等级', '90')}
        {renderOneRow('精炼等级', '3')}
        {renderOneRow('武器攻击力', '510')}
        {renderOneRow('武器加成', '攻击力 41.3%')}
        {renderOneRow('武器特效', '攻击力 54%')}
      </div>
      <Row className="title constellation">命之座</Row>
      <div>
        {renderOneRow('命之座', '1')}
      </div>
      <Row className="title talent">天赋</Row>
      <div>
        {renderOneRow('普通攻击', '11')}
        {renderOneRow('元素战技', '3')}
        {renderOneRow('元素爆发', '6')}
      </div>
      <Row className="title damage-report">伤害计算结果</Row>
      <div>
        <Row>二段蓄力伤害（触发特效前）</Row>
        <Row>期望伤害 xxx</Row>
        <Row>未暴击伤害 xxx</Row>
        <Row>暴击伤害 xxx</Row>

        <Row>二段蓄力伤害（触发特效后）</Row>
        <Row>期望伤害 xxx</Row>
        <Row>未暴击伤害 xxx</Row>
        <Row>暴击伤害 xxx</Row>

        <Row>元素战技</Row>
        <Row>期望伤害 xxx</Row>
        <Row>未暴击伤害 xxx</Row>
        <Row>暴击伤害 xxx</Row>

        <Row>元素爆发单发冰棱</Row>
        <Row>期望伤害 xxx</Row>
        <Row>未暴击伤害 xxx</Row>
        <Row>暴击伤害 xxx</Row>

        <Row>元素爆发最大伤害(51个冰棱)</Row>
        <Row>期望伤害 xxx</Row>
        <Row>未暴击伤害 xxx</Row>
        <Row>暴击伤害 xxx</Row>
      </div>
    </div>
  );
}

export default App;
