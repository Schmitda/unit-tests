import {ReversePipe} from "./reverse.pipe";


describe('ReversePipe', () => {

  it('should revert the string', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform("hello")).toEqual("olleh");
  });


});
