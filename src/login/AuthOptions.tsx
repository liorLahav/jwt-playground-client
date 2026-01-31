
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAuthOptions } from '../store/authOptionsSlice';
import type { RootState } from '../store';
import type { IAuthOptions } from '../types/login';

const AuthOptions = () => {
  const options = useSelector((state: RootState) => state.authOptions);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const payload: Partial<IAuthOptions> = {
      [name]: type === 'checkbox' ? checked : value,
    };
    dispatch(updateAuthOptions(payload));
  };

  return (
    <div className="w-[40%] bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-blue-900">JWT Authentication Options</h3>
      <p className="text-base text-blue-700 mb-6">Only HS256 algorithm is available.</p>
        
        <div>
          <label className="block text-sm font-medium text-blue-800">Storage Location</label>
          <select
            name="storedLocation"
            value={options.storedLocation}
            onChange={handleChange}
            className="mt-1 block w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
          >
            <option value="cookies">Cookies</option>
            <option value="localStorage">Local Storage</option>
            <option value="httponly">HTTP Only</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-blue-800">Algorithm</label>
          <input
            type="text"
            value="HS256"
            disabled
            className="mt-1 block w-full border border-gray-300 rounded p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="exp"
            checked={options.exp}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-blue-800">Include Expiration</label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-blue-800">SameSite</label>
          <select
            name="sameSite"
            value={options.sameSite}
            onChange={handleChange}
            className="mt-1 block w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-blue-50"
          >
            <option value="none">None</option>
            <option value="lax">Lax</option>
            <option value="strict">Strict</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="secure"
            checked={options.secure}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-blue-800">Secure</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="httpOnly"
            checked={options.httpOnly}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-blue-800">HTTP Only</label>
        </div>
      </div>
  );
};

export default AuthOptions;