import {Row, Col} from 'antd';
import DamageScenario from './component/DamageScenario';
import './App.css';
import {E} from './constant/element';
import {Scenario} from './scenario/ganyu';
import {Report} from './report/ganyu';
import Coffee from './component/Coffee';

function App() {
  const ganyuStats = {
    basicAttack: 823,
    additionalAttack: 1215,
    criticalRatio: 0.19,
    criticalDamage: 2.198,
    level: 81,
    mastery: 0,
    talentLevels: [11, 3, 6],
    damageBoost: {
      [E.CRYO]: 0.616
    }
  };
  const weaponStats = {
    name: 'prototype_crescent',
    level: 90,
    refineRank: 3
  };

  const scenarios = new Scenario(ganyuStats, weaponStats).generate();
  const reports = scenarios.map(scenario => {
    const report = new Report(scenario.characterStats).generate();
    return {description: scenario.description, ...report}
  })

  function renderOneRow(title, value) {
    return (<Row className="stat-row">
      <Col span={3} offset={9}>{title}</Col>
      <Col span={3} className='stat-value'>{value}</Col>
    </Row>)
  }

  return (
    <div className="app">
      <Row className="header">甘雨伤害计算小助手🐷<Coffee/></Row>
      <Row className="title base-stats">人物基础数值</Row>
      <div>
        {renderOneRow('人物等级', '81')}
        {renderOneRow('攻击力', '2082')}
        {renderOneRow('元素精通', '0')}
        {renderOneRow('暴击率', '19%')}
        {renderOneRow('暴击伤害', '219.8%')}
        {renderOneRow('冰元素伤害加成', '61.6%')}
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
        {renderOneRow('命之座', '0')}
      </div>
      <Row className="title talent">天赋</Row>
      <div>
        {renderOneRow('普通攻击', '11')}
        {renderOneRow('元素战技', '3')}
        {renderOneRow('元素爆发', '6')}
      </div>
      <DamageScenario reports={reports}/>
    </div>
  );
}

export default App;
