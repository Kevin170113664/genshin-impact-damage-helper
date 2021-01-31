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

    const dataSource = []
    if (chargeLevel2) {
      dataSource.push({
        key: '1',
        criticalDamage: chargeLevel2.frostflakeArrow.criticalDamage,
        damageExpectation: chargeLevel2.frostflakeArrow.damageExpectation,
        normalDamage: chargeLevel2.frostflakeArrow.normalDamage,
        tags: ['霜华矢'],
      })
      dataSource.push({
        key: '2',
        criticalDamage: chargeLevel2.frostflakeArrowBloom.criticalDamage,
        damageExpectation: chargeLevel2.frostflakeArrowBloom.damageExpectation,
        normalDamage: chargeLevel2.frostflakeArrowBloom.normalDamage,
        tags: ['霜华绽放'],
      })
    }

    if (elementalSkill) {
      dataSource.push({
        key: '3',
        criticalDamage: elementalSkill['1-hit'].criticalDamage,
        damageExpectation: elementalSkill['1-hit'].damageExpectation,
        normalDamage: elementalSkill['1-hit'].normalDamage,
        tags: ['释放冰莲'],
      })
      dataSource.push({
        key: '4',
        criticalDamage: elementalSkill['2-hit'].criticalDamage,
        damageExpectation: elementalSkill['2-hit'].damageExpectation,
        normalDamage: elementalSkill['2-hit'].normalDamage,
        tags: ['冰莲爆炸'],
      })
    }

    if (elementalBurst) {
      dataSource.push({
        key: '5',
        criticalDamage: elementalBurst.singleIceShard.criticalDamage,
        damageExpectation: elementalBurst.singleIceShard.damageExpectation,
        normalDamage: elementalBurst.singleIceShard.normalDamage,
        tags: ['冰雨1根冰棱'],
      })
      dataSource.push(      {
        key: '6',
        criticalDamage: elementalBurst.allIceShard.criticalDamage,
        damageExpectation: elementalBurst.allIceShard.damageExpectation,
        normalDamage: elementalBurst.allIceShard.normalDamage,
        tags: ['冰雨51根冰棱'],
      })
    }

    return (
      <Col lg={12} xs={24} key={index.toString()}>
        <Row justify="center" className="table-description">{report.description}</Row>
        <Row justify="center" className="scenario-table">
          <Table columns={columns} dataSource={dataSource} pagination={false} size="small"/>
        </Row>
      </Col>
    )
  }

  return (
    <Row className="damage-scenario">
      {map(reports, (report, index) => renderTable(report, index))}
    </Row>
  );
}

export default DamageScenario;
