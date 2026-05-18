import { expect } from 'chai';
import { 
  Specialist, 
  Guard, 
  DefenseLead, 
  HoneyHarvestEvent, 
  IntruderAlertEvent, 
  SwarmRequestEvent, 
  HiveEvent, 
  isAlertEvent, 
  isHarvestEvent, 
  processHiveEvent 
} from '../src/04-advanced';
import { AdultBee } from '../src/02-bees';

describe('Part 4: Hive Security & Events (Advanced Types)', () => {

  describe('DefenseLead Intersection Type', () => {
    it('should support combining AdultBee, Specialist, and Guard fields type-safely', () => {
      // Note: If you see compile errors here, make sure DefenseLead is defined as:
      // AdultBee & Specialist & Guard
      const leadProfile = { id: 99, name: 'Sarge', age: 30, role: 'Commander' };
      const sarge: DefenseLead = Object.assign(
        new AdultBee(30, 95, 'Royal Jelly', leadProfile),
        {
          specializationCode: 'DEF-STRAT',
          performAnalysis: () => 'Analysis: Fortress defenses secure',
          defendStation: 'Gates of Sovereign',
          alertSignal: () => 'Horn sounding: Attack!'
        }
      );

      expect(sarge.age).to.equal(30);
      expect(sarge.getHealth()).to.equal(95);
      expect(sarge.performRole()).to.equal('Bee Sarge is executing role: Commander');
      expect(sarge.specializationCode).to.equal('DEF-STRAT');
      expect(sarge.performAnalysis()).to.equal('Analysis: Fortress defenses secure');
      expect(sarge.defendStation).to.equal('Gates of Sovereign');
      expect(sarge.alertSignal()).to.equal('Horn sounding: Attack!');
    });
  });

  describe('HiveEvent Discriminated Union & Type Guards', () => {
    const harvest: HoneyHarvestEvent = {
      type: 'harvest',
      producerId: 104,
      potsAmount: 8
    };

    const alert: IntruderAlertEvent = {
      type: 'alert',
      sector: 'Sector-G',
      dangerLevel: 'HIGH'
    };

    const swarm: SwarmRequestEvent = {
      type: 'swarm',
      scoutId: 44,
      destination: 'Oak Hollow'
    };

    it('should correctly identify events using custom Type Guards', () => {
      expect(isAlertEvent(alert)).to.be.true;
      expect(isAlertEvent(harvest)).to.be.false;
      expect(isAlertEvent(swarm)).to.be.false;

      expect(isHarvestEvent(harvest)).to.be.true;
      expect(isHarvestEvent(alert)).to.be.false;
      expect(isHarvestEvent(swarm)).to.be.false;
    });

    it('should exhaustively narrow and process events in processHiveEvent', () => {
      expect(processHiveEvent(harvest)).to.equal('Harvested 8 pots of honey from producer 104');
      expect(processHiveEvent(alert)).to.equal('ALARM! Sector Sector-G under HIGH threat!');
      expect(processHiveEvent(swarm)).to.equal('Swarm sequence requested by scout 44 to Oak Hollow');
    });
  });

});
