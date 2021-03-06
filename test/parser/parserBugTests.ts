import '../index';

import test from 'ava';
import { expect } from 'chai';

import { EdiDocumentConfiguration, Parser } from '../../src/parser';

test('Can parse pipes', t => {

    const input = 'ISA|1.0|hello!something~';
    let parser = new Parser();
    const config = new EdiDocumentConfiguration('', '|', '!', '>', '~');

    // Act
    let result = parser.parseSegments(input, config);

    // Assert
    expect(result[0].elements).to.have.lengthOf(4);
    t.pass();
});

test('Can parse word characters in header.', t => {

    const input = 'ISAB00B          B00B          BZZB123456789012345BZZB123456789012346B080503B1705BUB00501B000010216B0BTBF~';
    let parser = new Parser();

    // Act
    let result = parser.parseHeader(input);

    // Assert
    expect(result.isValid).to.be.true;
    t.pass();
});

test('Can parse word characters as segment separater.', t => {

    const input = 'ISAB00B          B00B          BZZB123456789012345BZZB123456789012346B080503B1705BUB00501B000010216B0BTBFH123';
    let parser = new Parser();

    // Act
    let result = parser.parseHeader(input);

    // Assert
    expect(result.isValid).to.be.true;
    t.pass();
});

test('Can parse parse * as segment separators.', t => {

    const input = 'ISA`00`          `00`          `ZZ`123456789012345`ZZ`123456789012346`080503`1705`>`00501`000010216`0`T`:*';
    let parser = new Parser();

    // Act
    let result = parser.parseHeader(input);

    // Assert
    expect(result.isValid).to.be.true;
    expect(result.configuration.segmentSeparator).to.be.eq('*');
    t.pass();
});