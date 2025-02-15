import {flags} from '@oclif/command';
import Base from '../command-base';
import {ScaffoldOptions} from '../types';

export class Scaffold extends Base<ScaffoldOptions> {
  static description = 'create a project scaffold';

  static flags = {
    help: flags.boolean({
      name: 'help',
      description: 'show manual pages',
      type: 'boolean',
    }),
  };
  static args = [
    {name: 'name', description: 'name of the project', required: false},
  ];

  async run() {
    const input = this.parse(Scaffold);
    await super.generate('scaffold', {
      name: input.args.name,
      help: input.flags.help,
    });
  }
}
