// DPS=(r/t)*s*DR*RR*AT*CR*DB
// 我们可以有7个相乘的伤害区间来调整伤害，r是动作伤害倍率，t为动作持续时间 ，s为攻速 ，DR是防御减免效果，RR是元素抗性，AT为攻击力，CR为暴击收益，DB为增伤。其中除暴击收益CR外，每个区间内的相互加成为加值。

// (L+100)/(l+L+200)
// 其中l为怪物等级，L为角色等级
import {round2} from './rounding';

export class Calculator {
  constructor({attack, criticalRatio, criticalDamage, ratio, level}) {
    this.attack = attack;
    this.criticalRatio = criticalRatio;
    this.criticalDamage = criticalDamage;
    this.ratio = ratio;
    this.level = level;

    this.target = {
      level: level,
      resistRatio: 0.1
    }
  }

  calculate() {
    const levelMultiplier = (this.level + 100) / (this.level + this.target.level + 200);

    const normalDamage = this.attack * this.ratio * (1 - this.target.resistRatio) * levelMultiplier;
    const criticalDamage = this.attack * this.ratio * (1 - this.target.resistRatio) * (1 + this.criticalDamage) * levelMultiplier;
    const damageExpectation = this.criticalRatio * criticalDamage + (1 - this.criticalRatio) * normalDamage;

    return [round2(damageExpectation), round2(normalDamage), round2(criticalDamage)]
  }
}
