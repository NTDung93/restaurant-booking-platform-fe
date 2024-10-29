import { AddFood } from '@/common/models/food';
import { createAppAsyncThunk } from '@/libs/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'food';

export const fetchFoodByLocation = createAppAsyncThunk(
  `${TypePrefix}/fetchFoodByLocation`,
  async (locationId: number) =>
    await callApi({
      method: 'get',
      url: `/foods/location/${locationId}`,
    }),
);

export const addFood = createAppAsyncThunk(
  `${TypePrefix}/addFood`,
  async (food: AddFood) =>
    await callApi(
      {
        method: 'post',
        url: '/foods',
        data: food,
      },
      true,
    ),
);
export const editFood = createAppAsyncThunk(
  `${TypePrefix}/editFood`,
  async (food: AddFood) =>
    await callApi(
      {
        method: 'put',
        url: '/foods',
        data: food,
      },
      true,
    ),
);

// thunks.ts
export const deleteFood = createAppAsyncThunk(
  `${TypePrefix}/deleteFood`,
  async (id: number) => {
    await callApi(
      {
        method: 'delete',
        url: `/foods/${id}`,
      },
      true,
    );
    return id;
  },
);

export const fetchFoodById = createAppAsyncThunk(
  `${TypePrefix}/fetchFoodById`,
  async (id: number) => {
    const response = await callApi(
      {
        method: 'get',
        url: `/foods/${id}`,
      },
      true,
    );

    return response;
  },
);
