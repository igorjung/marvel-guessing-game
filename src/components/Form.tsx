import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styled from 'styled-components'
import IOption from '../interfaces/option'

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;

  width: 100%;
  padding: 0 64px;
  margin-top: 32px;

  @media only screen and (max-width: 820px) {
    display: block;
    text-align: center;
    padding: 0;
  }
`
const Input = styled(TextField)`
  width: 100%;
  height: 35px;
`;
const SubmitButton = styled.button`
  height: 35px;
  width: 120px;
  margin-left: auto;

  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  color: #fff;

  border-radius: 4px;
  background-color: ${({theme}) => theme.colors.primary};
  cursor: pointer;

  &:disabled {
    background-color: ${({theme}) => theme.colors.secondary};
    cursor: not-allowed;
  }

  @media only screen and (max-width: 820px) {
    margin: 16px 0 0 0;
  }
`;
const GuessNumber = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 16px;
`

interface IForm {
  options: IOption[]
  guesses: IOption[]
  guess: IOption
  text: string
  onInsert: (value: IOption) => void
  onConfirm: () => void
}
const Form = ({ 
  options, 
  guesses, 
  guess,
  text,
  onInsert,
  onConfirm
} : IForm) => {
  return (
    <>
      <FormContainer>
        <Autocomplete
          id="guessing-input"
          value={guess || null}
          options={options}
          getOptionLabel={(options) => options.name}
          onChange={(event: any, newValue: IOption) => {
            onInsert(newValue)
          }}
          clearOnEscape
          disableClearable
          blurOnSelect
          renderInput={(params) => (
            <Input
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                placeholder: 'Enter name character...',
              }}
            />
          )}
        />
        <SubmitButton 
          type="button"
          disabled={!guess} 
          onClick={onConfirm}
        >
          {text}
        </SubmitButton>
      </FormContainer>
      <GuessNumber>
        {guesses.length}/5
      </GuessNumber>
    </>
  )
}

export default Form