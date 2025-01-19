import { UserInfoResponse } from 'src/hooks/useGetUserInfo';

interface UserInfoProps {
  userInfo?: UserInfoResponse;
}

const UserInfo = ({ userInfo }: UserInfoProps) => {
  if (!userInfo) {
    return (
      <div>No data about user</div>
    );
  }

  const { name, currency, amount } = userInfo;

  return (
    <section className="w-80 p-4 bg-gray-50 rounded-lg" id='balance-section'>
      <h3 className="text-lg font-semibold mb-2">Profile Summary</h3>
      <p className="text-gray-600">Username: <span className='font-bold'>{name}</span></p>
      <p className="text-gray-600">
        Currency: <span className='font-bold'>{currency}</span>
      </p>
      <p className="text-gray-600">
        Balance: <span className='font-bold'>${amount}</span>
      </p>
    </section>
  )
  ;
};

export default UserInfo;
