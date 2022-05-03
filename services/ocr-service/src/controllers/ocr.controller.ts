import {
  Getter,
  inject
} from '@loopback/context';
import {
  Count,
  CountSchema,
  repository,
  Where
} from '@loopback/repository';
import {
  param,
  get,
  response,
  Response,
  RestBindings,
  patch,
  requestBody,
  getModelSchemaRef,
  del,
  put,
} from '@loopback/rest';
import {
  IRequest,
  RequestBindings
} from '../../../lb4-request/dist';
import {
  OcrResults
} from '../models';
import {
  OcrResultRepository
} from '../repositories';
import { OcrObject } from '../types';
export class OcrController {
  constructor(
    @repository(OcrResultRepository) public ocrResultRepository: OcrResultRepository,
    @inject.getter(RequestBindings.FetchProvider) private readonly requestProvider: Getter < IRequest > ,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) {
    (this.response as any).setTimeout(1000 * 60 * 20);
  }

  @get('/document-type/{contract_name}')
  @response(200, {
    description: 'Get contract document type'
  })
  async getContractDocumentType(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/document-type?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/termination-clause/{contract_name}')
  @response(200, {
    description: 'Get contract termination clause'
  })
  async getContractTerminationClause(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/termination-clause?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/ipr-ownership-clause/{contract_name}')
  @response(200, {
    description: 'Get contract ipr ownership clause'
  })
  async getContractIprOwnershipClause(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/ipr-ownership-clause?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/warranty-clause/{contract_name}')
  @response(200, {
    description: 'Get contract warranty clause'
  })
  async getContractWarrantyClause(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    const resp: any = await provider.send(`/contract-parser/warranty-clause?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/third-party-beneficiary/{contract_name}')
  @response(200, {
    description: 'Get contract third party beneficiary'
  })
  async getContractThirdPartyBeneficiary(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/third-party-beneficiary?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/governing-law/{contract_name}')
  @response(200, {
    description: 'Get contract governing law'
  })
  async getContractGoverningLaw(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/governing-law?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/validity-terms/{contract_name}')
  @response(200, {
    description: 'Get contract validity terms'
  })
  async getContractValidityTerms(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/validity-terms?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/liquidity-damages/{contract_name}')
  @response(200, {
    description: 'Get contract liquidity damages'
  })
  async getContractLiquidityDamages(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/liquidity-damages?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/limited-liability/{contract_name}')
  @response(200, {
    description: 'Get contract limited liability'
  })
  async getContractLimitedLiability(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/limited-liability?contract_name=${contract_name}`, {
      method: 'POST'
    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/legal-id/{contract_name}')
  @response(200, {
    description: 'Get contract legal id'
  })
  async getContractLegalId(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/legal_id?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/signatory-details/{contract_name}')
  @response(200, {
    description: 'Get contract signatory details'
  })
  async getContractSignatoryDetails(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/signatory_details?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/vendor/{contract_name}')
  @response(200, {
    description: 'Get contract vendor info'
  })
  async getContractVendor(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/vendor?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/payment-terms/{contract_name}')
  @response(200, {
    description: 'Get contract payment terms'
  })
  async getContractPaymentTerms(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/payment_terms?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/force-majeure/{contract_name}')
  @response(200, {
    description: 'Get contract force majeure'
  })
  async getContractForceMajeure(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/force-majeure?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/indemnity-clause/{contract_name}')
  @response(200, {
    description: 'Get contract indemnity clause'
  })
  async getContractIndemnityClause(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/indemnity-clause?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/auto-renewal/{contract_name}')
  @response(200, {
    description: 'Get contract auto renewal'
  })
  async getContractAutoRenewal(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/auto-renewal?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/currency/{contract_name}')
  @response(200, {
    description: 'Get contract currency'
  })
  async getContractCurrency(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/currency?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/public-announcement/{contract_name}')
  @response(200, {
    description: 'Get contract public announcement'
  })
  async getContractPublicAnnouncement(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/public-announcement?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/assignment/{contract_name}')
  @response(200, {
    description: 'Get contract assignment'
  })
  async getContractAssignment(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/assignment?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/support/{contract_name}')
  @response(200, {
    description: 'Get contract support'
  })
  async getContractSupport(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/support?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/contract-amount/{contract_name}')
  @response(200, {
    description: 'Get contract contract_amount'
  })
  async getContractContractAmount(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/contract-amount?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/sla-clause/{contract_name}')
  @response(200, {
    description: 'Get contract sla clause'
  })
  async getContractSlaClause(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/sla-clause?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }

  @get('/sla-dashboard/{contract_name}')
  @response(200, {
    description: 'Get contract sla dashboard'
  })
  async getContractSlaDashboard(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < object > {
    const provider = await this.requestProvider();

    await provider.send(`/contract-parser/sla-dashboard?contract_name=${contract_name}`, {
      method: 'POST',

    })

    return {
      status: 200,
      message: 'SUCCESS'
    }
  }


  @get('/clauses/{contract_name}')
  @response(200, {
    description: 'Get all contract clauses'
  })
  async getContractClauses(
    @param.path.string('contract_name') contract_name: string,
  ): Promise < OcrResults[] > {
    return this.ocrResultRepository.find({
      where: {
        contract_name: contract_name
      }
    });
  }

  @patch('/clauses')
  @response(200, {
    description: 'Clauses PATCH success count'
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(OcrResults, {
              title: 'Clauses'
            }),
          }
        },
      },
    })
    clauses: [Pick<OcrResults, 'id' | 'text' | 'confidence_level' | 'modified_by'>]
  ): Promise<any> {
      const result = await Promise.all(clauses.map((item) => this.ocrResultRepository.updateById(item.id, item)));
      return result;
  }


  @patch('/clauses/{id}')
  @response(204, {
    description: 'Clauses PATCH success',
  })
  async updateClauseById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OcrResults, {partial: true}),
        },
      },
    })
    clause: Pick<OcrResults, 'text' | 'confidence_level' | 'modified_by'>,
  ): Promise<void> {
    return this.ocrResultRepository.updateById(id, clause);
  }

  @put('/clauses/{id}')
  @response(204, {
    description: 'Clauses PUT success',
  })
  async replaceClauseById(
    @param.path.string('id') id: string,
    @requestBody() clause: OcrResults,
  ): Promise<void> {
    return this.ocrResultRepository.replaceById(id, clause);
  }

  @del('/clauses/{id}')
  @response(204, {
    description: 'Clauses DELETE success',
  })
  async deleteClauseById(
    @param.path.string('id') id: string,
  ): Promise<void> {
    return this.ocrResultRepository.deleteById(id);
  }

}