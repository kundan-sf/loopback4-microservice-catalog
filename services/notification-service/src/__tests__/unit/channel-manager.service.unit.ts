import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import {ChannelManagerProvider} from '../../providers';

describe('Notification User Service', () => {
  let channelManagerProvider: ChannelManagerProvider;

  afterEach(() => sinon.restore());
  beforeEach(setUp);

  describe('returns true for channel access allowed', () => {
    it('returns true', async () => {
      const result = channelManagerProvider.value().isChannelAccessAllowed();
      expect(result).to.eql(true);
    });
  });

  function setUp() {
    channelManagerProvider = new ChannelManagerProvider();
  }
});
