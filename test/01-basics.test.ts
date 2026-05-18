import { expect } from 'chai';
import * as basics from '../src/01-basics';

describe('Part 1: The Hive Registry (Basics & Core Types)', () => {
  
  it('should have correct basic variable types and initial values annotated', () => {
    expect(basics.hiveName).to.equal('Sovereign Swarm');
    expect(typeof basics.hiveName).to.equal('string');

    expect(basics.population).to.equal(45000);
    expect(typeof basics.population).to.equal('number');

    expect(basics.isQueenPresent).to.equal(true);
    expect(typeof basics.isQueenPresent).to.equal('boolean');
  });

  it('should have larvaeWeights as an array of numbers', () => {
    expect(basics.larvaeWeights).to.be.an('array');
    expect(basics.larvaeWeights).to.deep.equal([4.2, 5.8, 10.5, 3.1, 12.0]);
    basics.larvaeWeights.forEach((w: number) => {
      expect(typeof w).to.equal('number');
    });
  });

  it('should have hiveLocation as a Position3D 3-tuple', () => {
    // Position3D should represent [number, number, number]
    const coord: basics.Position3D = [34.56, -112.45, 150];
    expect(coord).to.be.an('array');
    expect(coord).to.have.lengthOf(3);
    expect(typeof coord[0]).to.equal('number');
    expect(typeof coord[1]).to.equal('number');
    expect(typeof coord[2]).to.equal('number');

    expect(basics.hiveLocation).to.deep.equal([36.8065, 10.1815, 250]);
  });

  it('should support the BeeProfile interface contract with required and optional keys', () => {
    // Note: If you see compile errors here, make sure your BeeProfile has the correct fields.
    const minimalBee: basics.BeeProfile = {
      id: 101,
      name: 'Buzz',
      age: 12,
      role: 'Forager'
    };
    expect(minimalBee.id).to.equal(101);
    expect(minimalBee.name).to.equal('Buzz');
    expect(minimalBee.age).to.equal(12);
    expect(minimalBee.role).to.equal('Forager');
    expect(minimalBee.specialization).to.be.undefined;
    expect(minimalBee.healthScore).to.be.undefined;

    const eliteBee: basics.BeeProfile = {
      id: 102,
      name: 'Barnaby',
      age: 28,
      role: 'Defender',
      specialization: 'Tactician',
      healthScore: 98
    };
    expect(eliteBee.specialization).to.equal('Tactician');
    expect(eliteBee.healthScore).to.equal(98);
  });

  it('should type and compute isLarvaReadyForCocoon correctly', () => {
    expect(basics.isLarvaReadyForCocoon(12.5)).to.be.true;
    expect(basics.isLarvaReadyForCocoon(10.5)).to.be.true;
    expect(basics.isLarvaReadyForCocoon(10.4)).to.be.false;
    expect(basics.isLarvaReadyForCocoon(4.0)).to.be.false;
  });

  it('should type and format registerBee correctly', () => {
    const p: basics.BeeProfile = {
      id: 5,
      name: 'Winger',
      age: 15,
      role: 'Scout'
    };
    expect(basics.registerBee(p)).to.equal('Registered bee: Winger as Scout');
  });

  it('should type and compute calculateAverageWeight correctly', () => {
    expect(basics.calculateAverageWeight([10, 20, 30])).to.equal(20);
    expect(basics.calculateAverageWeight([4.2, 5.8, 10.5, 3.1, 12.0])).to.be.closeTo(7.12, 0.01);
    expect(basics.calculateAverageWeight([])).to.equal(0);
  });

});
