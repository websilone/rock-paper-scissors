import utils from './gameUtils';

describe("Game utils", () => {
  describe('getAvailableShapes', () => {
    const config = {
      ALL_SHAPES: [1, 2],
    };
    
    it('should return the available shapes from the config', () => {
      expect(utils.getAvailableShapes(config)).toEqual([1, 2]);
    });

    it('should return an empty array by default', () => {
      expect(utils.getAvailableShapes({})).toEqual([]);
    });
  });
});