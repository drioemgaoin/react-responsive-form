import validate from './validations';
import Input from '../input/Input';

export default class InputEmail extends Input {
  static defaultProps = {
      validate: validate
  };

  constructor(props) {
    super(props);
  }
}
