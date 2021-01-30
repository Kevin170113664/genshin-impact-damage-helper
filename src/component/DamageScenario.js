import {Row, Col, Table, Tag} from 'antd';
import './DamageScenario.css';

const report = {
  chargeLevel2: {
    frostflakeArrow: {
      criticalDamage: 11391.22,
      damageExpectation: 5049.54,
      normalDamage: 3561.98
    },
    frostflakeArrowBloom: {
      criticalDamage: 19360.39,
      damageExpectation: 8582.14,
      normalDamage: 6053.9
    }
  },
  elementalSkill: {
    '1-hit': {
      criticalDamage: 7125.37,
      damageExpectation: 3158.56,
      normalDamage: 2228.07
    },
    '2-hit': {
      criticalDamage: 7125.37,
      damageExpectation: 3158.56,
      normalDamage: 2228.07
    }
  },
  elementalBurst: {
    allIceShard: {
      criticalDamage: 234293.49,
      damageExpectation: 103858.44,
      normalDamage: 73262.52
    },
    singleIceShard: {
      criticalDamage: 4593.99,
      damageExpectation: 2036.44,
      normalDamage: 1436.52
    },
  }
}

function DamageScenario() {
  const columns = [
    {
      title: '未暴击伤害',
      dataIndex: 'normalDamage',
      key: 'normalDamage',
    },
    {
      title: '暴击伤害',
      dataIndex: 'criticalDamage',
      key: 'criticalDamage',
    },
    {
      title: '期望伤害',
      dataIndex: 'damageExpectation',
      key: 'damageExpectation',
    },
    {
      title: '备注',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = 'green';
            if (tag === '未发动试做澹月特效') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      criticalDamage: 11391.22,
      damageExpectation: 5049.54,
      normalDamage: 3561.98,
      tags: ['二段蓄力霜华矢', '未发动试做澹月特效'],
    },
    {
      key: '2',
      criticalDamage: 19360.39,
      damageExpectation: 8582.14,
      normalDamage: 6053.9,
      tags: ['二段蓄力霜华绽放', '未发动试做澹月特效'],
    },
    {
      key: '3',
      criticalDamage: 7125.37,
      damageExpectation: 3158.56,
      normalDamage: 2228.07,
      tags: ['施放元素战技', '未发动试做澹月特效'],
    },
    {
      key: '4',
      criticalDamage: 7125.37,
      damageExpectation: 3158.56,
      normalDamage: 2228.07,
      tags: ['冰莲爆炸', '未发动试做澹月特效'],
    },
    {
      key: '5',
      criticalDamage: 4593.99,
      damageExpectation: 2036.44,
      normalDamage: 1436.52,
      tags: ['元素爆发1根冰棱伤害', '未发动试做澹月特效'],
    },
    {
      key: '6',
      criticalDamage: 234293.49,
      damageExpectation: 103858.44,
      normalDamage: 73262.52,
      tags: ['元素爆发51根冰棱总伤害', '未发动试做澹月特效'],
    },
  ];

  function renderOneRow(title, value) {
    return (<Row className="stat-row">
      <Col span={12}>{title}</Col>
      <Col span={12} className='stat-value'>{value}</Col>
    </Row>)
  }

  return (
    <div className="damage-scenario">
      <Row>
        <Col span={9} offset={2}>
          <Table columns={columns} dataSource={dataSource} pagination={false} size="small"/>
        </Col>
        <Col span={9} offset={1}>
          <Table columns={columns} dataSource={dataSource} pagination={false} size="small"/>
        </Col>
      </Row>
      <div className="footer">这计算器依然是一个未成熟的作品，请勿传播哟</div>
    </div>
  );
}

export default DamageScenario;
