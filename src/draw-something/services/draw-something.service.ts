import * as fs from 'fs';
import * as path from 'path';
 
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DrawSomethingService {
  getWordsFromLettersAndLength(letters: string, length: number): string[] {
    const dictionary = fs
      .readFileSync(
        path.join(__dirname, '../../../', 'data', 'words.txt'),
        'utf-8',
      )
      .split('\r\n')
      .map((word) => word.toLowerCase());

    const chars = letters.toLowerCase().split('');
    const combinations = this.getCombinations(chars, [], length);
    const words = dictionary.filter(
      (word) =>
        word.length === length &&
        this.isValidWord(word, chars) &&
        combinations.includes(word),
    );
    if (words.length === 0) {
      throw new NotFoundException(
        `No se encontraron palabras con las letras ${letters} y longitud ${length}`,
      );
    }
    return words;
  }

  private getCombinations(
    remaining: string[],
    partial: string[],
    length: number,
  ): string[] {
    if (partial.length === length) {
      return [partial.join('')];
    }
    return remaining.reduce((combinations, char, index) => {
      const nextPartial = [...partial, char];
      const nextRemaining = [
        ...remaining.slice(0, index),
        ...remaining.slice(index + 1),
      ];
      return [
        ...combinations,
        ...this.getCombinations(nextRemaining, nextPartial, length),
      ];
    }, []);
  }

  private isValidWord(word: string, letters: string[]): boolean {
    const remaining = [...letters.map((char) => char.toLowerCase())];
    for (const char of word.toLowerCase()) {
      const index = remaining.indexOf(char);
      if (index === -1) {
        return false;
      }
      remaining.splice(index, 1);
    }
    return true;
  }
}
