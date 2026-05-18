import { expect } from 'chai';
import { 
  StrictRegistryConfig, 
  LaborBeeType, 
  FilterLaborBees, 
  RequiredRegistrySummary, 
  PublicAnalyticsReport, 
  ForagingMetricsRecord,
  RawAnalyticsData
} from '../src/06-analytics';
import { BeeProfile } from '../src/01-basics';

describe('Part 6: Analytics Dashboard (Mapped & Conditional Types)', () => {

  describe('StrictRegistryConfig Mapped Type', () => {
    it('should transform all keys of BeeProfile into mandatory properties', () => {
      // StrictRegistryConfig<BeeProfile> makes all properties required and readonly.
      // We verify keys are present at compilation.
      const keys: Array<keyof StrictRegistryConfig<BeeProfile>> = [
        'id',
        'name',
        'age',
        'role',
        'specialization',
        'healthScore'
      ];
      expect(keys).to.include('specialization');
      expect(keys).to.include('healthScore');
    });
  });

  describe('FilterLaborBees Conditional Type', () => {
    it('should resolve to labor-capable types and filter out non-labor roles', () => {
      interface GroundLarva { role: 'Larva'; canPerformLabor: false }
      interface FlyingForager { role: 'Forager'; canPerformLabor: true; fieldCodes: string[] }
      interface DroneGroomer { role: 'Groomer'; canPerformLabor: true; cleanChambers: number }
      interface RoyalQueen { role: 'Queen'; canPerformLabor: false; eggRate: number }

      type WorkforceUnion = GroundLarva | FlyingForager | DroneGroomer | RoyalQueen;

      // FilterLaborBees<WorkforceUnion> should resolve to FlyingForager | DroneGroomer.
      // This variable will compile only if it can take both fields or resolves safely.
      const foragerWorker: FilterLaborBees<WorkforceUnion> = {
        role: 'Forager',
        canPerformLabor: true,
        fieldCodes: ['F-1', 'F-2']
      };
      expect(foragerWorker.role).to.equal('Forager');

      const groomerWorker: FilterLaborBees<WorkforceUnion> = {
        role: 'Groomer',
        canPerformLabor: true,
        cleanChambers: 12
      };
      expect(groomerWorker.role).to.equal('Groomer');
    });
  });

  describe('TypeScript Built-In Utility Types', () => {
    it('should support RequiredRegistrySummary with all fields mandated', () => {
      // RequiredRegistrySummary = Required<BeeProfile>
      const keys: Array<keyof RequiredRegistrySummary> = [
        'id',
        'name',
        'age',
        'role',
        'specialization',
        'healthScore'
      ];
      expect(keys).to.include('specialization');
      expect(keys).to.include('healthScore');
    });

    it('should support PublicAnalyticsReport excluding secret log fields', () => {
      // PublicAnalyticsReport = Omit<RawAnalyticsData, 'confidentialSystemLog'>
      const report: PublicAnalyticsReport = {
        totalHoneyHarvested: 500,
        avgPollenSacks: 8.5,
        threatCount: 3
      };
      expect(report.totalHoneyHarvested).to.equal(500);
      expect(report.avgPollenSacks).to.equal(8.5);
      expect(report.threatCount).to.equal(3);

      const keys: Array<keyof PublicAnalyticsReport> = [
        'totalHoneyHarvested',
        'avgPollenSacks',
        'threatCount'
      ];
      expect(keys).to.not.include('confidentialSystemLog');
    });

    it('should support ForagingMetricsRecord as record mapping string to number yields', () => {
      // ForagingMetricsRecord = Record<string, number>
      const metrics: ForagingMetricsRecord = {
        'Meadow-Alpha': 250,
        'Field-Beta': 120,
        'Garden-Gamma': 540
      };
      expect(metrics['Meadow-Alpha']).to.equal(250);
      expect(metrics['Field-Beta']).to.equal(120);
      expect(metrics['Garden-Gamma']).to.equal(540);
    });
  });

});
