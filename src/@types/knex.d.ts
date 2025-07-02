import { Knex } from 'knex'

declare module 'knex/types/tables' {
	export interface Tables {
		produto: {
			id
			ativo
			categoria_armazenagem_id
			codigo
			codigoerp
			comprimento_master
			comprimento_unidade
			descricao
			dun
			ean
			embalagem
			empresa_id
			estoque_desconsiderado
			exclusivo_crossdocking
			induz_lote
			marca
			multiplo
			nivel_maximo_armazenagem
			peso_master
			peso_unidade
			peso_variavel
			pode_informar_codigo_interno
			qtde_avaria_gerencial
			qtde_gerencial
			qtde_reservada
			qtunit
			qtunitcx
			status_integracao
			tipo_separacao
			total_norma_palete
			usa_lote_unico_no_picking
			usa_picking
			volume_master
			volume_unidade
			kit_id
			data_ultimo_inventario
			numero_ultimo_inventario
			tem_inventario_ativo
			usuario_id_alteracao
			produto_preco_id
			fornecedor_id
		}
		movimentacao: {
			id
			qtde_ocorrencias
			abastecimento_id
			antecipada
			atrasada
			box
			cliente
			codigo_conferente
			codigo_embalador
			codigo_separador
			conferido
			data_embalagem
			data_estorno
			data_fabricacao
			data_fim_conferencia
			data_fim_separacao
			data_finalizacao
			data_geracao
			data_inicio_conferencia
			data_inicio_separacao
			data_integracao
			data_liberacao
			data_validade
			empresa_id
			endereco_final
			estoque_id
			estornado
			gerou_pendencia_estoque
			id_erp
			id_usuario_geracao
			induziu_lote
			lote
			maior_predio
			numero_caixa_et
			numero_carga
			numero_conferencia_entrada
			numeroom
			numero_pedido
			numero_sequencia_entrega
			numero_sequencia_montagem
			numero_transacao
			numero_unitizador
			observacao_item
			ordem
			qt
			qt_estoque_ae
			qtconferida
			qtcx
			qtorig
			qtseparada
			qtun
			recebimento_liberado_venda
			reentrega
			separado
			sequencia_flow_rack_convocar
			situacao
			status_integracao
			tipo
			tipo_operacao
			tipo_separacao_produto
			usuario_estorno_id
			volume_id
			box_id
			conferencia_id
			endereco_id
			endereco_origem_id
			etiqueta_ual_id
			mapa_separacao_id
			produto_id
			data_embarque_palete
		}
		usuario: {
			id: number
			ativo: string
			chapaerp: number
			login: string
			nome: string
			senha: string
		}
		deposito_conferencia: {
			id: number
			deposito: number
			usuario_id: number
		}
		endereco: {
			id: number
			deposito: number
			ativo: string
		}
		PCEMPR: {
			matricula: number
			nome: string
			usuariobd: string
			senhabd: string
		}
		PCCONTRO: {
			codusuario: number
			codrotina: number
			acesso: string
		}
		TABFABRICA: {
			CODFABRICA: number
			NOME: string
			ICMS: number
			ST: number
			MARGEMF6: number
			MARGEMF2A: number
			MARGEMF2V: number
			ATIVO: string
		}
		TABCALCULOFABRICA: {
			PRODDUTO: string
			FABRICA: string
			STFABRICA: number
			ICMSFABRICA: number
			MARGEMF6: number
			MARGEMF2VRJ: number
			MARGEMF2ATC: number
			PBASEF6: number
			PVENDAF6: number
			PVENDAF2ATC: number
			PVENDAF2VRJ: number
			DTINCLUSAO: Date
			CODFUNC
		}
	}
}
