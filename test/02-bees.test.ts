import { expect } from 'chai';
import { BaseLarva, AdultBee, HoneyProducerBee, PollenForager, RoyalQueenBee } from '../src/02-bees';
import { BeeProfile } from '../src/01-basics';

describe('Part 2: The Hive Hierarchy (OOP, Subclasses & Access Modifiers)', () => {

  describe('BaseLarva Class', () => {
    let larva: BaseLarva;

    beforeEach(() => {
      larva = new BaseLarva(3, 40, 'Honey mixture');
    });

    it('should initialize and hold readonly age', () => {
      expect(larva.age).to.equal(3);
      // Verify compile-time type exists by reading the property
      const a: number = larva.age;
      expect(a).to.equal(3);
    });

    it('should return initial healthScore using getHealth()', () => {
      expect(larva.getHealth()).to.equal(40);
    });

    it('should increase healthScore via eat(amount) by amount * 2', () => {
      larva.eat(10);
      expect(larva.getHealth()).to.equal(60);
    });

    it('should clamp healthScore at a maximum of 100', () => {
      larva.eat(50);
      expect(larva.getHealth()).to.equal(100);
      larva.eat(10);
      expect(larva.getHealth()).to.equal(100);
    });
  });

  describe('AdultBee Class', () => {
    let adult: AdultBee;
    let profile: BeeProfile;

    beforeEach(() => {
      profile = { id: 12, name: 'Buzzette', age: 10, role: 'Worker' };
      adult = new AdultBee(10, 80, 'Beebread', profile);
    });

    it('should inherit from BaseLarva', () => {
      expect(adult.age).to.equal(10);
      expect(adult.getHealth()).to.equal(80);
      adult.eat(5);
      expect(adult.getHealth()).to.equal(90);
    });

    it('should hold registryProfile and return it using getProfile()', () => {
      expect(adult.getProfile()).to.deep.equal(profile);
    });

    it('should print the correct role statement using performRole()', () => {
      expect(adult.performRole()).to.equal('Bee Buzzette is executing role: Worker');
    });
  });

  describe('HoneyProducerBee Class', () => {
    let producer: HoneyProducerBee;
    let profile: BeeProfile;

    beforeEach(() => {
      profile = { id: 15, name: 'Amber', age: 14, role: 'Nectar Synthesizer' };
      producer = new HoneyProducerBee(14, 90, 'Beebread', profile);
    });

    it('should initialize honeyPotsCollected to 0', () => {
      const initialPots = producer.unloadHoney();
      expect(initialPots).to.equal(0);
    });

    it('should increment honey pots and boost health by 2 in produceHoney()', () => {
      producer.produceHoney();
      expect(producer.getHealth()).to.equal(92);
      
      producer.produceHoney();
      expect(producer.getHealth()).to.equal(94);

      const pots = producer.unloadHoney();
      expect(pots).to.equal(2);
    });

    it('should reset honey pots count after unloading', () => {
      producer.produceHoney();
      producer.produceHoney();
      
      expect(producer.unloadHoney()).to.equal(2);
      expect(producer.unloadHoney()).to.equal(0);
    });
  });

  describe('PollenForager Class', () => {
    let flightForager: PollenForager;
    let groundedForager: PollenForager;
    let profile: BeeProfile;

    beforeEach(() => {
      profile = { id: 22, name: 'Swift', age: 8, role: 'Scout' };
      flightForager = new PollenForager(8, 75, 'Nectar', profile, true);
      groundedForager = new PollenForager(8, 75, 'Nectar', profile, false);
    });

    it('should append structured coordinate string if canFly is true', () => {
      flightForager.forage([36.8065, 10.1815, 250]);
      flightForager.forage([37.1234, 11.5678, 100]);

      expect(flightForager.getTreasure()).to.deep.equal([
        'pollen-36.8065-10.1815-250',
        'pollen-37.1234-11.5678-100'
      ]);
    });

    it('should NOT append any coordinate string if canFly is false', () => {
      groundedForager.forage([36.8065, 10.1815, 250]);
      expect(groundedForager.getTreasure()).to.have.lengthOf(0);
    });
  });

  describe('RoyalQueenBee Class', () => {
    let queen: RoyalQueenBee;
    let profile: BeeProfile;

    beforeEach(() => {
      profile = { id: 1, name: 'Regina', age: 100, role: 'Queen' };
      queen = new RoyalQueenBee(100, 100, 'Royal Jelly', profile);
    });

    it('should lay eggs and output laying stats statement', () => {
      expect(queen.layEggs(50)).to.equal('Queen Regina laid 50 larvae');
    });

    it('should register and track worker registry', () => {
      const w1 = new AdultBee(5, 80, 'Beebread', { id: 10, name: 'WorkerA', age: 5, role: 'Builder' });
      const w2 = new AdultBee(6, 82, 'Beebread', { id: 11, name: 'WorkerB', age: 6, role: 'Cleaner' });

      queen.registerWorker(w1);
      queen.registerWorker(w2);

      expect(queen.getWorkers()).to.have.lengthOf(2);
      expect(queen.getWorkers()[0]).to.equal(w1);
      expect(queen.getWorkers()[1]).to.equal(w2);
    });
  });

});
