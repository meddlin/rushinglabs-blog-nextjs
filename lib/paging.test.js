import { 
    calculateBlogPagingInfo,
    calculateSectionPagingInfo
 } from './paging';

describe('calculateBlogPagingInfo', () => {
    it('should return an answer', () => {

        let result = calculateBlogPagingInfo();

        expect(result).not.toBeNaN();
    });
});

describe('calculateSectionPagingInfo', () => {
    it('should return an answer', () => {

        let result = calculateSectionPagingInfo();

        expect(result).not.toBeNaN();
    });
});