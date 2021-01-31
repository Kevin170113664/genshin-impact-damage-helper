import React, {useState} from 'react';
import {Row, Col, InputNumber, Menu, Dropdown, Button} from 'antd';
import DamageScenario from './component/DamageScenario';
import {E} from './constant/element';
import {Scenario} from './scenario/ganyu';
import {Report} from './report/ganyu';
import Coffee from './component/Coffee';
import './App.css';
import {WEAPON_AMOS_BOW, WEAPON_PROTOTYPE_CRESCENT, WEAPON_SKYWARD_HARP} from './constant/weapon';

function App() {
  const [level, setLevel] = useState(90);
  const [basicAttack, setBasicAttack] = useState(943);
  const [additionalAttack, setAdditionalAttack] = useState(1445);
  const [mastery, setMastery] = useState(0);
  const [criticalRatio, setCriticalRatio] = useState(25);
  const [criticalDamage, setCriticalDamage] = useState(240);
  const [cryoDamageBonus, setCryoDamageBonus] = useState(61.6);
  const [normalTalent, setNormalTalent] = useState(11);
  const [skillTalent, setSkillTalent] = useState(13);
  const [burstTalent, setBurstTalent] = useState(13);
  const [constellation, setConstellation] = useState(6);
  const [refineRank, setRefineRank] = useState(5);
  const [weaponName, setWeaponName] = useState(WEAPON_AMOS_BOW.name);

  const ganyuStats = {
    basicAttack,
    additionalAttack,
    criticalRatio: criticalRatio / 100,
    criticalDamage: criticalDamage / 100,
    level,
    mastery,
    constellation,
    talentLevels: [normalTalent, skillTalent, burstTalent],
    damageBoost: {
      [E.CRYO]: cryoDamageBonus / 100
    }
  };
  const weaponStats = {
    name: weaponName,
    refineRank
  };

  const scenarios = new Scenario(ganyuStats, weaponStats).generate();
  const reports = scenarios.map(scenario => {
    const report = new Report(scenario.characterStats, scenario.targetStats, scenario.weaponStats).generate();
    return {description: scenario.description, ...report}
  })

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

    return (
      <Row className="stat-row">
        <Col span={3} offset={9}>{title}</Col>
        <Col span={3} className='stat-value'>
          <InputNumber size="small" min={min} max={max} onChange={onChange} value={value}/>
        </Col>
      </Row>
    )
  }

  function onSelectWeapon({key}) {
    setWeaponName(key)
  }

  function renderDropdown(title) {
    const menu = (
      <Menu onSelect={onSelectWeapon} onClick={onSelectWeapon}>
        <Menu.Item key={WEAPON_AMOS_BOW.name}>{WEAPON_AMOS_BOW.label}</Menu.Item>
        <Menu.Item key={WEAPON_SKYWARD_HARP.name}>{WEAPON_SKYWARD_HARP.label}</Menu.Item>
        <Menu.Item key={WEAPON_PROTOTYPE_CRESCENT.name}>{WEAPON_PROTOTYPE_CRESCENT.label}</Menu.Item>
      </Menu>
    );
    const weaponLabel = {
      [WEAPON_PROTOTYPE_CRESCENT.name]: WEAPON_PROTOTYPE_CRESCENT.label,
      [WEAPON_AMOS_BOW.name]: WEAPON_AMOS_BOW.label,
      [WEAPON_SKYWARD_HARP.name]: WEAPON_SKYWARD_HARP.label
    }
    return (
      <Row className="stat-row">
        <Col span={3} offset={9}>{title}</Col>
        <Col span={3} className='stat-value'>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button size="small">{weaponLabel[weaponName]}</Button>
          </Dropdown>
        </Col>
      </Row>
    )
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
        {renderDropdown('装备武器', '试做澹月')}
        {renderNumber('精炼等级', refineRank, setRefineRank, 1, 5)}
      </div>
      <Row className="title constellation">命之座</Row>
      <div>
        {renderNumber('命之座', constellation, setConstellation, 0, 6)}
      </div>
      <Row className="title talent">天赋</Row>
      <div>
        {renderNumber('普通攻击', normalTalent, setNormalTalent, 1, 11)}
        {renderNumber('元素战技', skillTalent, setSkillTalent, 1, 13)}
        {renderNumber('元素爆发', burstTalent, setBurstTalent, 1, 13)}
      </div>
      <DamageScenario reports={reports}/>
    </div>
  );
}

export default App;
