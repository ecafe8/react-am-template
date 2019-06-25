import React from 'react';
import axios from 'axios';
import { isLocal } from 'common/utils';
import { Toast } from 'antd-mobile';

/**
 * Ajax
 *
 * Ajax.req({ url, params, method })
 */
export default class Ajax {

  static getApi(api) {
    let url = eval(`CFG.api.${api}`);
    let arr = url.split('.');
    const reg = /^https?:\/\/|^\/\//; // http请求也不走本地mock数据
    if (isLocal() && arr[0] !== 'mock' && !reg.test(url)) {
      arr = api.split('.');
      url = './mock';
      arr.forEach(item => {
        url += '/' + item;
      });
      url += '.json';
    }
    return url;
  }

  static req(options, _params, _method, _ignoreError, _errorNotice, _successNotice) {
    // 兼容一下入参写法
    if (typeof options === 'string') {
      options = {
        url: options,
        params: _params || {},
        method: _method || 'get',
        ignoreError: _ignoreError || false, // 忽略错误，不进行错误弹层提示
        errorNotice: _errorNotice || '', // 定义错误信息，覆盖后端的错误信息
        successNotice: _successNotice || '', // 定义成功信息
      };
    }
    let { url, params, method = 'get'} = options;
    // console.log('url', url);
    if (isLocal()) {
      method = 'get';
    }
    url = Ajax.getApi(url);
    method = method.toLowerCase();
    params = {
      ...params,
      token: CFG.token,
    };
    // get 请求要用 params 包一层
    if (method === 'get') {
      params = {
        params
      };
    }


    return new Promise((resolve, reject) => {
      axios[method](url, params).then(resp => {
        const respData = resp.data;
        const { code, data } = respData;
        if (code !== 0) {
          reject(respData);
        } else {
          resolve(data, respData);
          if (options.successNotice) {
            Toast.success(options.successNotice);
          }
        }
      });
    }).catch((error) => {

      let notice = '系统繁忙，请稍后再试。';
      if (error.response) {
        console.warn('Ajax error.response', error.response);
      } else if (error.request) {
        console.warn('Ajax error.request', error.request);
      } else if (error.message) {
        console.warn('Ajax error.message', error.message);
      }
      console.warn('Ajax error', error);

      if (error.notice ) {
        notice = error.notice;
      }

      if (options.errorNotice ) {
        notice = options.errorNotice;
      }

      if (!options.ignoreError) {
        Toast.error(notice);
      }
    });

  }
}
