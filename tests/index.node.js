"use strict";
const wazniya = require("../");
const assert = require('assert')
// const assert = require("assert");

var public_key =
	"0727dba4aa52c9a67fef2ea23eac67633a2372faa1a1d9032c55dff12e66034b";
var private_key =
	"f6c11d80db5caec8d1ed10790f69d8cf22c42618c36e256d661a22b757173203";

var nettype = wazniya.nettype_utils.network_type.MAINNET;

var wazn_utils;

async function t1()
{
	try {
		var decoded = (await wazniya.wazn_utils_promise).decode_address(
			"WazNa1KKQqtjAG7sc1rVmm2bVjpmE58nXQ2sRgVyVRQdEyYrPzhFBgVEr9Ne2aTqP3VqXwJPtz1CCU58H6UacvvH4sDeysvbkH",
			nettype,
		);
		console.log("decoded", decoded)
	} catch (e) {
		console.log(e)
	}

	try {
		var created = (await wazniya.wazn_utils_promise).newly_created_wallet(
			"ja",
			nettype,
		);
		console.log("newly_created_wallet", created)
		//
		try {
			var unpacked = (await wazniya.wazn_utils_promise).seed_and_keys_from_mnemonic(
				created.mnemonic_string,
				nettype,
			);
			console.log("seed_and_keys_from_mnemonic", created)
		} catch (e) {
			console.log(e)
		}
	} catch (e) {
		console.log(e)
	}

	try {
		var fee = new wazniya.JSBigInt((await wazniya.wazn_utils_promise).estimated_tx_network_fee(
			"0", 1, "24658", 10
			// fee_per_kb__string, priority, fee_per_b__string, optl__fork_version
		));
		console.log("estimated_tx_network_fee", wazniya.wazn_amount_format_utils.formatMoneyFull(fee), "WAZN")
	} catch (e) {
		console.log(e)
	}

	try {
		const blockchain_height = 1231
		const tx =
		{
			unlock_time: blockchain_height + 5,
		}
		const reason = wazniya.wazn_txParsing_utils.TransactionLockedReason(tx, blockchain_height)
		console.log("reason" , reason)
		assert.equal(0, reason.indexOf("Will be unlocked in 5 blocks, ~5 minutes, Today at"))
	} catch (e) {
		console.log(e)
	}


	try {
		const blockchain_height = wazniya.wazn_config.maxBlockNumber
		const tx =
		{
			unlock_time: blockchain_height * 10000,
		}
		const reason = wazniya.wazn_txParsing_utils.TransactionLockedReason(tx, blockchain_height)
		console.log("reason" , reason)
		assert.equal(0, reason.indexOf("Will be unlocked in"))
		assert.notEqual(-1, reason.indexOf("years"))
	} catch (e) {
		console.log(e)
	}

}
t1()
