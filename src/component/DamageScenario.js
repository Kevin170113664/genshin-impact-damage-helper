import {Row, Col, Table, Tag} from 'antd';
import map from 'lodash/map'
import './DamageScenario.css';
import {round0} from '../calculator/rounding';

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
        criticalDamage: round0(chargeLevel2.frostflakeArrow.criticalDamage),
        damageExpectation: round0(chargeLevel2.frostflakeArrow.damageExpectation),
        normalDamage: round0(chargeLevel2.frostflakeArrow.normalDamage),
        tags: ['霜华矢'],
      })
      dataSource.push({
        key: '2',
        criticalDamage: round0(chargeLevel2.frostflakeArrowBloom.criticalDamage),
        damageExpectation: round0(chargeLevel2.frostflakeArrowBloom.damageExpectation),
        normalDamage: round0(chargeLevel2.frostflakeArrowBloom.normalDamage),
        tags: ['霜华绽放'],
      })
    }

    if (elementalSkill) {
      dataSource.push({
        key: '3',
        criticalDamage: round0(elementalSkill['1-hit'].criticalDamage),
        damageExpectation: round0(elementalSkill['1-hit'].damageExpectation),
        normalDamage: round0(elementalSkill['1-hit'].normalDamage),
        tags: ['释放冰莲'],
      })
      dataSource.push({
        key: '4',
        criticalDamage: round0(elementalSkill['2-hit'].criticalDamage),
        damageExpectation: round0(elementalSkill['2-hit'].damageExpectation),
        normalDamage: round0(elementalSkill['2-hit'].normalDamage),
        tags: ['冰莲爆炸'],
      })
    }

    if (elementalBurst) {
      dataSource.push({
        key: '5',
        criticalDamage: round0(elementalBurst.singleIceShard.criticalDamage),
        damageExpectation: round0(elementalBurst.singleIceShard.damageExpectation),
        normalDamage: round0(elementalBurst.singleIceShard.normalDamage),
        tags: ['冰雨1根冰棱'],
      })
      dataSource.push(      {
        key: '6',
        criticalDamage: round0(elementalBurst.allIceShard.criticalDamage),
        damageExpectation: round0(elementalBurst.allIceShard.damageExpectation),
        normalDamage: round0(elementalBurst.allIceShard.normalDamage),
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
