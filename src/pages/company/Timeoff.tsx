import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, User, Calendar, Send, Clock } from 'lucide-react';
import { Dropzone } from "@/components/ui/dropzone";
import companyTimeOffRequestRepository from '@/repositories/company/companyTimeOffRequestRepository';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Spinner } from '@/components/ui/spinner';
import { useGlobalState } from '@/providers/globalContext';

type Step = 'employee-selection' | 'otp-verification' | 'request-form' | 'success';

export default function CompanyTimeOff() {


  const [request, setRequest] = useState<any>({});
  const [currentStep, setCurrentStep] = useState<Step>('employee-selection');
  const [otp, setOtp] = useState('');
  const [otpTimeLeft, setOtpTimeLeft] = useState(0)
  const [isOtpResendDisabled, setIsOtpResendDisabled] = useState(false)
  const [isInitialLoading, setIsInitalLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    leaveType: '',
    reason: '',
    attachmets: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { agent } = useGlobalState();

  const leaveTypes = [
    {
      label: 'Sick leave (Illness or Injury)',
      value: 'sick_leave'
    },
    {
      label: 'Bereavement leave (Immediate Family)',
      value: 'bereavement_leave'
    },
    {
      label: 'Personal leave',
      value: 'personal_leave'
    },
    {
      label: 'Emergency leave',
      value: 'emergency_leave'
    },
    {
      label: 'Temporary leave',
      value: 'temporary_leave'
    },
    {
      label: 'Leave without pay',
      value: 'leave_without_pay'
    },
    {
      label: 'Extra day off',
      value: 'extra_day_off'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ];

  const fetchRequest = async (id: string) => {
    const response = await companyTimeOffRequestRepository.getTimeOffRequest(id);
    if (response.success) {
      if (!response.data.otp_verified) {
        setCurrentStep('otp-verification');
      }
      else {
        setCurrentStep('request-form')
      }


      setRequest(response.data);
    }
  }

  const handleInitlizeTimeOffRequest = async () => {
    setLoading(true);
    const response = await companyTimeOffRequestRepository.saveTimeOffRequest();
    if (response.success) {

      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("id", response.data.id);
      navigate({
        pathname: location.pathname,
        search: `?${newSearchParams.toString()}`,
      });

      setRequest(response.data);
      setCurrentStep('otp-verification')
    }
    setLoading(false);
  }

  const handleValidateOtp = async () => {

    setLoading(true);
    const data = { otp, id: request.id }
    const response = await companyTimeOffRequestRepository.validateOtp(data);
    if (response.success) {
      setCurrentStep('request-form')
    }
    else {
      setError(response.message)
    }
    setLoading(false);

  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!selectedEmployee) return;

    setLoading(true);
    setError(null);

    try {


      const response = await companyTimeOffRequestRepository.updateTimeOffRequest(request.id, formData);
      if (response.success) {
        setCurrentStep('success');

        toast({
          variant: "default",
          duration: 800,
          className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
          title: "Time-off request successfuly saved",
          action: <ToastAction altText="close">close</ToastAction>,
        });

      }
    } catch (err) {
      toast({
        variant: "destructive",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "unable to save Time-off request",
        action: <ToastAction altText="close">close</ToastAction>,
      });

      setError(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysDifference = (from: string, to: string) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const timeDiff = toDate.getTime() - fromDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const handleAttachmentUploaded = async function (fileId: number) {
    console.log("uplaoded", fileId);


    const response = await companyTimeOffRequestRepository.add_attachment({
      id: request.id,
      attachment_id: fileId
    });
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "attachment successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "unable to save attachment",
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  };

  const handleAttachmentRemoved = async function (attachment_id: string) {
    const data = {
      id: request.id,
      attachment_id: attachment_id,
    }
    const response = await companyTimeOffRequestRepository.remove_attachment(data);

    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property media successfully removed`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to remove property media`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    return '';
  }

  const handleResend = () => {
    const timestamp = Date.now()
    localStorage.setItem("otp-resend-timestamp", timestamp.toString())
    setOtpTimeLeft(180)
    setIsOtpResendDisabled(true)
    console.log("Resending OTP...")
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (otpTimeLeft > 0) {
      interval = setInterval(() => {
        setOtpTimeLeft((time) => {
          if (time <= 1) {
            setIsOtpResendDisabled(false)
            localStorage.removeItem("otp-resend-timestamp")
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [otpTimeLeft])

  const init = async () => {
    const storedTimestamp = localStorage.getItem("otp-resend-timestamp")
    if (storedTimestamp) {
      const timestamp = Number.parseInt(storedTimestamp)
      const now = Date.now()
      const elapsed = Math.floor((now - timestamp) / 1000)
      const remaining = Math.max(0, 180 - elapsed) // 180 seconds = 3 minutes

      if (remaining > 0) {
        setOtpTimeLeft(remaining)
        setIsOtpResendDisabled(true)
      } else {
        // Timer has expired, clean up
        localStorage.removeItem("otp-resend-timestamp")
      }
    }


    const newSearchParams = new URLSearchParams(location.search);
    const request_id = newSearchParams.get("id");
    if (request_id) {
      await fetchRequest(request_id);
    }
    setIsInitalLoading(false)

  }

  useEffect(() => { 
    if (agent.value.has_pending_timeoff_request) {
      setIsInitalLoading(false);
      setCurrentStep('success');
    }
    else {
      init();
    }

  }, [])


  return (
    isInitialLoading ?
      <div className="min-h-screen bg-gray-50 animate-pulse">
        {/* Progress Steps */}
        <div className="flex justify-center items-center pt-8 pb-12">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="flex justify-center px-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border p-8">
            {/* Large Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>

            {/* Main Title */}
            <div className="text-center mb-6">
              <div className="h-8 bg-gray-300 rounded mx-auto w-80 mb-4"></div>
            </div>

            {/* Subtitle/Description */}
            <div className="text-center mb-12 space-y-2">
              <div className="h-4 bg-gray-300 rounded mx-auto w-full max-w-lg"></div>
              <div className="h-4 bg-gray-300 rounded mx-auto w-full max-w-md"></div>
            </div>

            {/* How it works section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              {/* Section Title */}
              <div className="h-6 bg-gray-300 rounded w-32 mb-6"></div>

              {/* Steps */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start space-x-3">
                  <div className="h-4 bg-gray-300 rounded w-16 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-3">
                  <div className="h-4 bg-gray-300 rounded w-16 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-3">
                  <div className="h-4 bg-gray-300 rounded w-16 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
      :

      <div className="min-h-screen py-4 px-4 sm:py-2">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Time Off Request</h1>
            <p className="text-gray-600">Submit your leave request securely</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 'employee-selection' ? 'bg-blue-600 text-white' :
                ['otp-verification', 'request-form', 'success'].includes(currentStep) ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                <User className="w-4 h-4" />
              </div>
              <div className={`w-8 h-1 ${['otp-verification', 'request-form', 'success'].includes(currentStep) ? 'bg-green-600' : 'bg-gray-300'
                }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 'otp-verification' ? 'bg-blue-600 text-white' :
                ['request-form', 'success'].includes(currentStep) ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                <Send className="w-4 h-4" />
              </div>
              <div className={`w-8 h-1 ${['request-form', 'success'].includes(currentStep) ? 'bg-green-600' : 'bg-gray-300'
                }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 'request-form' ? 'bg-blue-600 text-white' :
                currentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>

          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center text-red-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <p className="text-sm">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'employee-selection' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="text-center space-y-4">
                    <User className="w-12 h-12 mx-auto text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Welcome to Time Off Request</h3>
                      <p className="text-muted-foreground mb-4">
                        You're logged in and ready to submit your leave request. This secure process ensures your request is
                        properly processed and approved.
                      </p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>

                <div className="space-y-6">

                  <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-medium text-blue-900">How it works:</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Step 1:</span>
                        <span>Verify your identity with a secure OTP sent to your registered email</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Step 2:</span>
                        <span>Fill out your leave request with dates, type, and reason</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Step 3:</span>
                        <span>Receive confirmation and track your request status</span>
                      </li>
                    </ul>
                  </div>
                </div>


                <div className="flex space-x-3 mt-4">
                  <Button
                    onClick={() => handleInitlizeTimeOffRequest()}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>


              </CardContent>
            </Card>
          )}

          {currentStep === 'otp-verification' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Verify OTP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      We've sent a 6-digit code to your email starting with
                      <span className="font-medium mx-2">{'blaxk@blaxk.cc'.slice(-4)} ***</span>
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="otp">Enter 6-digit code</Label>
                    <Input
                      id="otp"
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      className="mt-1 text-center text-lg tracking-widest"
                    />
                  </div>


                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{"Didn't receive the code?"}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResend}
                      disabled={isOtpResendDisabled}
                      className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                    >
                      {isOtpResendDisabled ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Resend in {formatTime(otpTimeLeft)}</span>
                        </div>
                      ) : (
                        "Resend Code"
                      )}
                    </Button>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('employee-selection')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleValidateOtp}
                      disabled={otp.length !== 6}
                      className="flex-1"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'request-form' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Time Off Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromDate">Leave date - From</Label>
                      <Input
                        id="fromDate"
                        type="date"
                        value={formData.fromDate}
                        min={new Date(new Date().getTime() + 86400000).toISOString().split('T')[0]}
                        onChange={(e) => setFormData(prev => ({ ...prev, fromDate: e.target.value, toDate: '' }))}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="toDate">Leave date - To</Label>
                      <Input
                        id="toDate"
                        type="date"
                        value={formData.toDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, toDate: e.target.value }))}
                        required
                        min={formData.fromDate}
                        className="mt-1"
                        disabled={formData.fromDate.length == 0}
                      />
                    </div>
                  </div>
                  {formData.fromDate && formData.toDate && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-sm text-blue-800">
                        <strong>Total days:</strong> {calculateDaysDifference(formData.fromDate, formData.toDate)} day(s)
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="leaveType">Type of leave</Label>
                    <Select
                      value={formData.leaveType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, leaveType: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaveTypes.map((leaveType) => (
                          <SelectItem key={leaveType.value} value={leaveType.value}>
                            {leaveType.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason for leave (Optional)</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Additional context for your leave request"
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="attachment">Attach Supporting Document (Optional)</Label>
                    <div className="mt-1">
                      <Dropzone upload={true} uploadTo='backoffice' allowedFormats={["image/jpeg", "text/csv", "application/vnd.ms-excel", "application/csv", "text/x-csv", "application/x-csv", "text/comma-separated-values", "text/x-comma-separated-values"]} type="multiple" onFilesAdded={(fileId, _) => handleAttachmentUploaded(fileId)} initialFiles={request.attachments} onFileRemoved={async (id) => handleAttachmentRemoved(id)} onFileSortUpdated={()=>{}}></Dropzone>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={true}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !formData.fromDate || !formData.toDate || !formData.leaveType}
                      className="flex-1"
                    >
                      {
                        loading ?
                          <Spinner />
                          : <></>
                      }
                      {loading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {currentStep === 'success' && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Request Submitted Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your time off request has been submitted and is pending approval.
                    You will be notified once it's reviewed.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link to={'/company'} className='text-blue-600'> Go To Home  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

  );
}
