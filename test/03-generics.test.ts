import { expect } from 'chai';
import { ChamberStorage, Task, HiveTaskRunner } from '../src/03-generics';

describe('Part 3: Chamber Storage & Task Queues (Generics)', () => {

  describe('ChamberStorage<T> Class', () => {
    it('should operate type-safely for string items (e.g. food types)', () => {
      const storage = new ChamberStorage<string>();
      expect(storage.size()).to.equal(0);

      storage.addItem('Honey Jar');
      storage.addItem('Nectar Extract');
      expect(storage.size()).to.equal(2);
      expect(storage.getItem(0)).to.equal('Honey Jar');
      expect(storage.getItem(1)).to.equal('Nectar Extract');
      expect(storage.getItem(2)).to.be.undefined;

      expect(storage.listItems()).to.deep.equal(['Honey Jar', 'Nectar Extract']);
    });

    it('should operate type-safely for number items (e.g. jar weights)', () => {
      const storage = new ChamberStorage<number>();
      storage.addItem(15.4);
      storage.addItem(18.2);

      expect(storage.size()).to.equal(2);
      expect(storage.getItem(0)).to.equal(15.4);
      expect(storage.listItems()).to.deep.equal([15.4, 18.2]);
    });
  });

  describe('HiveTaskRunner<T extends Task> Class', () => {
    interface ExtendedTask extends Task {
      assignedBeeId: number;
    }

    it('should queue and process tasks in FIFO order', () => {
      const runner = new HiveTaskRunner<ExtendedTask>();
      expect(runner.size()).to.equal(0);

      const t1: ExtendedTask = { id: 1, description: 'Clean Hive Entrance', urgency: 'LOW', assignedBeeId: 101 };
      const t2: ExtendedTask = { id: 2, description: 'Guard Regina', urgency: 'HIGH', assignedBeeId: 102 };

      runner.queueTask(t1);
      runner.queueTask(t2);
      expect(runner.size()).to.equal(2);

      const run1 = runner.runNextTask();
      expect(run1).to.equal(t1);
      expect(runner.size()).to.equal(1);

      const run2 = runner.runNextTask();
      expect(run2).to.equal(t2);
      expect(runner.size()).to.equal(0);

      expect(runner.runNextTask()).to.be.undefined;
    });

    it('should filter high priority tasks correctly', () => {
      const runner = new HiveTaskRunner<Task>();
      const t1: Task = { id: 1, description: 'Check Larvae Larva', urgency: 'LOW' };
      const t2: Task = { id: 2, description: 'ALERT: Horners at Gate', urgency: 'HIGH' };
      const t3: Task = { id: 3, description: 'Repair honeycomb', urgency: 'HIGH' };

      runner.queueTask(t1);
      runner.queueTask(t2);
      runner.queueTask(t3);

      const highPriority = runner.getHighPriorityTasks();
      expect(highPriority).to.have.lengthOf(2);
      expect(highPriority).to.deep.equal([t2, t3]);
      // Verify tasks remain in queue
      expect(runner.size()).to.equal(3);
    });
  });

});
