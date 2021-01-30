import {Row, Col, Table, Tag} from 'antd';
import map from 'lodash/map'
import './DamageScenario.css';

function DamageScenario({reports}) {
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
            const color = 'green';
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

  function renderTable(report, index) {
    const {chargeLevel2, elementalSkill, elementalBurst} = report;
    const dataSource = [
      {
        key: '1',
        criticalDamage: chargeLevel2.frostflakeArrow.criticalDamage,
        damageExpectation: chargeLevel2.frostflakeArrow.damageExpectation,
        normalDamage: chargeLevel2.frostflakeArrow.normalDamage,
        tags: ['二段蓄力霜华矢'],
      },
      {
        key: '2',
        criticalDamage: chargeLevel2.frostflakeArrowBloom.criticalDamage,
        damageExpectation: chargeLevel2.frostflakeArrowBloom.damageExpectation,
        normalDamage: chargeLevel2.frostflakeArrowBloom.normalDamage,
        tags: ['二段蓄力霜华绽放'],
      },
      {
        key: '3',
        criticalDamage: elementalSkill['1-hit'].criticalDamage,
        damageExpectation: elementalSkill['1-hit'].damageExpectation,
        normalDamage: elementalSkill['1-hit'].normalDamage,
        tags: ['施放元素战技'],
      },
      {
        key: '4',
        criticalDamage: elementalSkill['2-hit'].criticalDamage,
        damageExpectation: elementalSkill['2-hit'].damageExpectation,
        normalDamage: elementalSkill['2-hit'].normalDamage,
        tags: ['冰莲爆炸'],
      },
      {
        key: '5',
        criticalDamage: elementalBurst.singleIceShard.criticalDamage,
        damageExpectation: elementalBurst.singleIceShard.damageExpectation,
        normalDamage: elementalBurst.singleIceShard.normalDamage,
        tags: ['元素爆发1根冰棱伤害'],
      },
      {
        key: '6',
        criticalDamage: elementalBurst.allIceShard.criticalDamage,
        damageExpectation: elementalBurst.allIceShard.damageExpectation,
        normalDamage: elementalBurst.allIceShard.normalDamage,
        tags: ['元素爆发51根冰棱总伤害'],
      },
    ];

    return (
      <>
        <Row justify="center" className="table-description">{report.description}</Row>
        <Row justify="center" key={index.toString()}>
          <Table columns={columns} dataSource={dataSource} pagination={false} size="small"/>
        </Row>
      </>
    )
  }

  return (
    <div className="damage-scenario">
      {map(reports, (report, index) => renderTable(report, index))}
      <div className="footer">这计算器依然是一个未成熟的作品，请勿传播哟</div>
    </div>
  );
}

export default DamageScenario;
