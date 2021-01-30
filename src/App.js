import React, {useState} from 'react';
import {Row, Col, InputNumber} from 'antd';
import DamageScenario from './component/DamageScenario';
import {E} from './constant/element';
import {Scenario} from './scenario/ganyu';
import {Report} from './report/ganyu';
import Coffee from './component/Coffee';
import './App.css';

function App() {
  const [level, setLevel] = useState(81);
  const [basicAttack, setBasicAttack] = useState(823);
  const [additionalAttack, setAdditionalAttack] = useState(1215);
  const [mastery, setMastery] = useState(0);
  const [criticalRatio, setCriticalRatio] = useState(19);
  const [criticalDamage, setCriticalDamage] = useState(219.8);
  const [cryoDamageBonus, setCryoDamageBonus] = useState(61.6);

  const ganyuStats = {
    basicAttack,
    additionalAttack,
    criticalRatio: criticalRatio / 100,
    criticalDamage: criticalDamage / 100,
    level,
    mastery,
    talentLevels: [11, 3, 6],
    damageBoost: {
      [E.CRYO]: cryoDamageBonus / 100
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

  function renderNumber(title, value, onChange, min, max, isPercentage) {
    if (isPercentage) {
      return (
        <Row className="stat-row">
          <Col span={3} offset={9}>{title}</Col>
          <Col span={3} className='stat-value'>
            <InputNumber size="small" min={min} max={max} onChange={onChange} value={value}
                         formatter={value => `${value}%`} parser={value => value.replace('%', '')}/>
          </Col>
        </Row>
      )
    }

    return (<Row className="stat-row">
      <Col span={3} offset={9}>{title}</Col>
      <Col span={3} className='stat-value'>
        <InputNumber size="small" min={min} max={max} onChange={onChange} value={value}/>
      </Col>
    </Row>)
  }

  return (
    <div className="app">
      <Row className="header">甘雨伤害计算小助手🐷<Coffee/></Row>
      <Row className="title base-stats">人物状态</Row>
      <div>
        {renderNumber('人物等级', level, setLevel, 1, 90)}
        {renderNumber('基础攻击力(白字)', basicAttack, setBasicAttack, 1, 9999)}
        {renderNumber('附加攻击力(绿字)', additionalAttack, setAdditionalAttack, 1, 9999)}
        {renderNumber('元素精通', mastery, setMastery, 0, 9999)}
        {renderNumber('暴击率', criticalRatio, setCriticalRatio, 5, 100, true)}
        {renderNumber('暴击伤害', criticalDamage, setCriticalDamage, 50, 1000, true)}
        {renderNumber('冰元素伤害加成', cryoDamageBonus, setCryoDamageBonus, 0, 1000, true)}
      </div>
      <Row className="title weapon-stats">武器状态</Row>
      <div>
        {renderOneRow('装备武器', '试做澹月')}
        {renderOneRow('精炼等级', '3')}
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
