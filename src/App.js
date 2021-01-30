import { Layout, Row } from 'antd';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>原神伤害计算小助手🐷</Header>
        <Content>
          <div>
            <Row>人物等级 90</Row>
            <Row>攻击力 1000</Row>
            <Row>元素精通 0</Row>
            <Row>暴击率 5%</Row>
            <Row>暴击伤害 50%</Row>
            <Row>冰元素伤害加成 46.6%</Row>
            <Row>物理伤害加成 0%</Row>
          </div>
          <div>
            <Row>装备武器 试做澹月</Row>
            <Row>武器等级 90</Row>
            <Row>精炼等级 5</Row>
            <Row>武器攻击力 510</Row>
            <Row>武器加成 攻击力41.3%</Row>
            <Row>武器特效 攻击力54%</Row>
          </div>
          <div>
            <Row>圣遗物套装 冰4件</Row>
            <Row>圣遗物套装效果1 冰元素伤害加成15%</Row>
            <Row>圣遗物套装效果2 对冰附着敌人加20%暴击率，对结冰敌人加40%暴击率</Row>
          </div>
          <div>
            <Row>命之座 1</Row>
          </div>
          <div>
            <Row>普通攻击 11</Row>
            <Row>元素战技 3</Row>
            <Row>元素爆发 3</Row>
          </div>
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
            <Row>元素爆发</Row>
            <Row>期望伤害 xxx</Row>
            <Row>未暴击伤害 xxx</Row>
            <Row>暴击伤害 xxx</Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
