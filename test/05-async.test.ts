import { expect } from 'chai';
import { WeatherReport, WeatherError, WeatherService, HiveDispatcher } from '../src/05-async';

describe('Part 5: Foraging Dispatcher (Asynchronous Operations & Promises)', () => {

  // Simple mock implementation of WeatherService
  class MockWeatherService implements WeatherService {
    public mockReports: Record<string, WeatherReport> = {};

    public async getWeather(locationName: string): Promise<WeatherReport> {
      const report = this.mockReports[locationName];
      if (!report) {
        throw new Error(`No mock report configured for location: ${locationName}`);
      }
      return report;
    }
  }

  let service: MockWeatherService;
  let dispatcher: HiveDispatcher;

  beforeEach(() => {
    service = new MockWeatherService();
    dispatcher = new HiveDispatcher(service);
  });

  it('should successfully deploy foragers under SAFE weather conditions', async () => {
    service.mockReports['Garden'] = { temperature: 24, windSpeed: 8, status: 'SAFE' };

    const result = await dispatcher.dispatchSquad('Garden', ['Buzz', 'Barnaby', 'Swift']);
    expect(result).to.equal('Success: Deployed 3 foragers');
  });

  it('should deploy foragers with safety gear under WARNING weather conditions', async () => {
    service.mockReports['Forest Edge'] = { temperature: 16, windSpeed: 22, status: 'WARNING' };

    const result = await dispatcher.dispatchSquad('Forest Edge', ['Amber']);
    expect(result).to.equal('Warning: Deployed 1 foragers with safety gear');
  });

  it('should abort dispatch and throw a WeatherError under DANGEROUS weather conditions', async () => {
    service.mockReports['Mountain Ridge'] = { temperature: 2, windSpeed: 48, status: 'DANGEROUS' };

    try {
      await dispatcher.dispatchSquad('Mountain Ridge', ['Buzz', 'Amber']);
      expect.fail('Expected dispatchSquad to throw WeatherError but it succeeded');
    } catch (error: any) {
      expect(error).to.be.an.instanceOf(WeatherError);
      expect(error.message).to.equal('Dangerous weather: dispatch aborted');
    }
  });

});
